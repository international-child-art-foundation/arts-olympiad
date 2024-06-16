const { ddbDocClient } = require("../lib/dynamoDBClient");
const { GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

async function getTotalVotes() {
    const input = {
        TableName: tableName,
        ProjectionExpression: "votes",
        Key: {
            pk: "VOTES",
            sk: "TOTAL"
        }
    };
    try {
        const response = await ddbDocClient.send(new GetCommand(input));
        if (!response.Item) {
            console.log("Votes not found.");
        }
        return response;
    } catch(error) {
        console.error("Error getting votes", error);
        throw error;
    }
}

async function updateTotalVotes(decrement=false) {
    operator = (decrement === true) ? "-" : "+";

    const input = {
      TableName: tableName,
      Key: {
        pk: "VOTES",
        sk: "TOTAL"
      },
      UpdateExpression: `SET votes = if_not_exists(votes, :initial) ${operator} :value`,
      ExpressionAttributeValues: {
        ":value": 1,
        ":initial": 0,
      },
      ReturnValues: "UPDATED_NEW"
    }; 

    try {
      const response = await ddbDocClient.send(new UpdateCommand(input));
      return response;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
}

async function incrementTotalVotes() {
    return updateTotalVotes()
}
  
async function decrementTotalVotes() {
    return updateTotalVotes(decrement=true)
}

module.exports = {
    getTotalVotes,
    incrementTotalVotes,
    decrementTotalVotes
};
