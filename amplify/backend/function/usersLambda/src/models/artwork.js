const { ddbDocClient } = require("../lib/dynamoDBClient");
const { DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand, TransactWriteCommand } = require("@aws-sdk/lib-dynamodb");
const VotesModel = require("./votes");
const { s3Client } = require("../lib/s3Client");
const { ListObjectsV2Command, DeleteObjectsCommand } = require("@aws-sdk/client-s3");



let tableName = "dynamo22205621";
let bucketName = "artsolympiadf677eab9a54848dc8788ee9110a11839185846";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
  bucketName = bucketName + "-" + process.env.ENV;
}

async function getArtworkById(artworkSk) {
  const input = {
    TableName: tableName,
    ProjectionExpression: "sk, description, sport, #loc, is_approved, votes, f_name, age, is_ai_gen, model, prompt, file_type",
    ExpressionAttributeNames: { "#loc": "location" },
    Key: {
      pk: "ART",
      sk: artworkSk
    }
  };
  try {
    const response = await ddbDocClient.send(new GetCommand(input));
    if (!response.Item) {
      console.log(`Artwork with ID ${artworkSk} not found.`);
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

async function createArtworkAndUpdateUser(item, userSk) {
  const transactItems = [
    {
      Put: {
        TableName: tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(pk) AND attribute_not_exists(sk)"
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "USER",
          sk: userSk
        },
        UpdateExpression: "SET has_active_submission = :true",
        ExpressionAttributeValues: {
          ":true": true
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    }
  ];

  const command = new TransactWriteCommand({ TransactItems: transactItems });

  try {
    await ddbDocClient.send(command);
    return {
      artwork: item,
      userUpdated: true
    };
  } catch (error) {
    console.error("Error adding artwork and updating user", error);
    throw error;
  }
}

async function deleteArtworkById(artworkSk) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkSk
    }
  };
  try {
    await ddbDocClient.send(new DeleteCommand(input));
    return;
  } catch(error) {
    console.error(`Error deleting artwork with sk ${artworkSk}`);
    throw error;
  }
}

async function addNewVote(userSk, artworkSk) {
  const transactItems = [
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "USER",
          sk: userSk
        },
        UpdateExpression: "SET voted_sk = :artworkSk",
        ExpressionAttributeValues: {
          ":artworkSk": artworkSk
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "ART",
          sk: artworkSk
        },
        UpdateExpression: "ADD votes :inc",
        ExpressionAttributeValues: {
          ":inc": 1
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "VOTES",
          sk: "TOTAL"
        },
        UpdateExpression: "ADD votes :inc",
        ExpressionAttributeValues: {
          ":inc": 1
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    }
  ];

  const command = new TransactWriteCommand({ TransactItems: transactItems });

  try {
    await ddbDocClient.send(command);
    return { message: "Vote added successfully" };
  } catch (error) {
    console.error("Error adding new vote", error);
    throw error;
  }
}

async function changeVote(userSk, oldArtworkId, newArtworkId) {
  const transactItems = [
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "ART",
          sk: oldArtworkId
        },
        UpdateExpression: "ADD votes :dec",
        ExpressionAttributeValues: {
          ":dec": -1
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk) AND votes > :zero",
        ExpressionAttributeValues: {
          ":dec": -1,
          ":zero": 0
        }
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "USER",
          sk: userSk
        },
        UpdateExpression: "SET voted_sk = :newArtworkId",
        ExpressionAttributeValues: {
          ":newArtworkId": newArtworkId
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "ART",
          sk: newArtworkId
        },
        UpdateExpression: "ADD votes :inc",
        ExpressionAttributeValues: {
          ":inc": 1
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    }
  ];

  const command = new TransactWriteCommand({ TransactItems: transactItems });

  try {
    await ddbDocClient.send(command);
    return { message: "Vote changed successfully" };
  } catch (error) {
    console.error("Error changing vote", error);
    throw error;
  }
}

async function deleteArtworkAndFiles(artworkSk) {
  try {
    // Delete from DynamoDB
    await deleteArtworkFromDynamoDB(artworkSk);

    // Delete folder from S3
    await deleteArtworkFolderFromS3(artworkSk);

    return { message: "Successfully deleted artwork and associated files" };
  } catch (error) {
    console.error("Error deleting artwork and files", error);
    throw error;
  }
}

async function deleteArtworkFromDynamoDB(artworkSk) {
  const transactItems = [
    {
      Delete: {
        TableName: tableName,
        Key: {
          pk: "ART",
          sk: artworkSk
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    },
    {
      Update: {
        TableName: tableName,
        Key: {
          pk: "USER",
          sk: artworkSk
        },
        UpdateExpression: "SET has_active_submission = :false",
        ExpressionAttributeValues: {
          ":false": false
        },
        ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)"
      }
    }
  ];

  const command = new TransactWriteCommand({ TransactItems: transactItems });

  try {
    await ddbDocClient.send(command);
    console.log(`Successfully deleted artwork ${artworkSk} and updated user status`);
  } catch (error) {
    console.error(`Error in transactional delete for artwork ${artworkSk}:`, error);
    throw error;
  }
}

async function deleteArtworkFolderFromS3(artworkSk) {
  const listParams = {
    Bucket: bucketName,
    Prefix: `${artworkSk}/`
  };

  try {
    const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));
    if (listedObjects.Contents.length === 0) return;
    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
    });

    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    if (listedObjects.IsTruncated) await deleteArtworkFolderFromS3(artworkSk);

  } catch (error) {
    console.error(`Error deleting S3 folder for artwork ${artworkSk}`, error);
    throw error;
  }
}

async function updateVoteArtworkbyId(artworkSk, decrement=false) {
  operator = (decrement === true) ? "-" : "+";

  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkSk
    },
    UpdateExpression: `SET votes = votes ${operator} :value`,
    ExpressionAttributeValues: {
      ":value": 1,
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

async function incrementVoteArtworkById(artworkSk) {
  VotesModel.incrementTotalVotes();
  return updateVoteArtworkbyId(artworkSk)
}

async function decrementVoteArtworkById(artworkSk) {
  VotesModel.decrementTotalVotes();
  return updateVoteArtworkbyId(artworkSk, decrement=true)
}

async function approveArtworkById(artworkSk, approvalStatus) {
  const isApproved = approvalStatus === true;
  const gsi1pkVal = isApproved ? 1 : 0;

  const input = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: artworkSk
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
    ProjectionExpression: "sk, description, sport, #loc, is_approved, votes, f_name, l_name, age, is_ai_gen, model, prompt, file_type",
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
  createArtworkAndUpdateUser,
  deleteArtworkById,
  deleteArtworkAndFiles,
  incrementVoteArtworkById,
  decrementVoteArtworkById,
  approveArtworkById,
  queryArtworks,
  buildQueryInputs,
  addNewVote,
  changeVote
};
