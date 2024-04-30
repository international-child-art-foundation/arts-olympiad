const { ddbDocClient } = require("../lib/dynamoDBClient");
const { DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

async function getArtworkById(artworkId) {
  const input = {
    TableName: tableName,
    ProjectionExpression: "id, title, sport, #loc, is_approved, votes, f_name, l_name, age, is_ai_gen, model, prompt",
    ExpressionAttributeNames: { "#loc": "location" },
    Key: {
      pk: "ART",
      sk: artworkId
    }
  };
  try {
    const response = await ddbDocClient.send(new GetCommand(input));
    if (!response.Item) {
      console.log(`Artwork with ID ${artworkId} not found.`);
    }
    return response;
  } catch(error) {
    console.error("Error getting artwork from Db", error);
    throw error;
  }
}

async function createArtwork(item) {
  const input = {
    TableName: tableName,
    Item: item
  };

  try {
    await ddbDocClient.send(new PutCommand(input));
    return;
  } catch (error) {
    console.error("Error adding artwork", error);
    throw error;
  }
}

async function deleteArtworkById(artworkId) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkId
    }
  };
  try {
    await ddbDocClient.send(new DeleteCommand(input));
    return;
  } catch(error) {
    console.error(`Error deleting artwork with id ${artworkId}`);
    throw error;
  }
}

async function voteArtworkById(artworkId) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkId
    },
    UpdateExpression: "ADD votes :increment",
    ExpressionAttributeValues: {
      ":increment": 1,
    },
    ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
    ReturnValues: "ALL_NEW"
  }; 

  try {
    const response = await ddbDocClient.send(new UpdateCommand(input));
    return response;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function approveArtworkById(artworkId, approvalStatus) {
  const isApproved = approvalStatus === true;
  const gsi1pkVal = isApproved ? 1 : 0;

  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkId
    }
  };

  let result = await ddbDocClient.send(new GetCommand(input));
  const { sport, location, timestamp } = result.Item;

  console.log(isApproved);
  console.log(gsi1pkVal);
  input.UpdateExpression = "set is_approved = :approvalVal, gsi1pk = :gsi1pk, gsi2pk = :gsi2pk, gsi2sk = :gsi2sk, gsi3pk = :gsi3pk, gsi3sk = :gsi3sk";

  input.ExpressionAttributeValues = {
    ":approvalVal": isApproved,
    ":gsi1pk": gsi1pkVal, 
    ":gsi2pk": sport,
    ":gsi2sk": `${location}#${timestamp}`,
    ":gsi3pk": location,
    ":gsi3sk": `${sport}#${timestamp}`,
  },
  input.ReturnValues = "ALL_NEW";

  try {
    const response = await ddbDocClient.send(new UpdateCommand(input));
    return response;
  } catch(error) {
    console.error(error.message);
    throw error;
  }
}

async function queryArtworks(input, startKey=null) {
  if (startKey) {
    input.ExclusiveStartKey = startKey;
  }

  try {
    const response =  await ddbDocClient.send(new QueryCommand(input));
    return {
      items: response.Items,
      lastKey: response.LastEvaluatedKey
    };
  } catch (error) {
    console.log("error with querying artworks" + error);
    throw error;
  }
}

// helper functions
function buildQueryInputs(params, limitPerQuery) {
  const inputs = [];

  const isApproved = params["is_approved"];
  const sports = params["sport"];
  const locations = params["location"];
  const orderBy = params["order_by"];

  if (isApproved) {
    const gsi1pkValue = isApproved[0] === "true" ? 1 : 0; 
    inputs.push(addInput({
      indexName: "gsi1-index",
      keyConditionExpr: "gsi1pk = :v_is_approved",
      exprAtrValue: {":v_is_approved" : gsi1pkValue},
      limit: limitPerQuery,
      orderBy: orderBy
    }));
  } else if (sports && locations) {
    for (const sport of sports) {
      for (const location of locations) {
        inputs.push(addInput({
          indexName: "gsi2-index",
          keyConditionExpr: "gsi2pk = :v_sport AND begins_with(gsi2sk, :v_location)",
          exprAtrValue: {":v_sport" : sport, ":v_location": location},
          limit: limitPerQuery,
          orderBy: orderBy
        }));
      }
    }
  } else if (sports) {
    for (const sport of sports) {
      inputs.push(addInput({
        indexName: "gsi2-index",
        keyConditionExpr: "gsi2pk = :v_sport",
        exprAtrValue: {":v_sport" : sport},
        limit: limitPerQuery,
        orderBy: orderBy
      }));
    }
  } else if (locations) {
    for (const location of locations) {
      inputs.push(addInput({
        indexName: "gsi3-index",
        keyConditionExpr: "gsi3pk = :v_location",
        exprAtrValue: {":v_location" : location},
        limit: limitPerQuery,
        orderBy: orderBy
      }));
    }
  }
  return inputs;
}

function addInput({indexName, keyConditionExpr, exprAtrValue, limit=20, orderBy}) {
  const scanIndexForward = (Array.isArray(orderBy) ? orderBy[0] : orderBy) !== "descending";
  const input = {
    TableName: tableName,
    ProjectionExpression: "id, title, sport, #loc, is_approved, votes",
    ExpressionAttributeNames: { "#loc": "location" },
    IndexName: indexName,
    KeyConditionExpression: keyConditionExpr,
    ExpressionAttributeValues: exprAtrValue,
    Limit: limit,
    ScanIndexForward: scanIndexForward
  };
  return input;
}

module.exports = {
  getArtworkById,
  createArtwork,
  deleteArtworkById,
  voteArtworkById,
  approveArtworkById,
  queryArtworks,
  buildQueryInputs
};