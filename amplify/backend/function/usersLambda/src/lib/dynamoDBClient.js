const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

module.exports = {
  ddbDocClient
};