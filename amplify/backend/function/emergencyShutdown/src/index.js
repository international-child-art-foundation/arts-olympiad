/* Amplify Params - DO NOT EDIT
	API_APIA4ACF3FA_APIID
	API_APIA4ACF3FA_APINAME
	ENV
	REGION
	STORAGE_DYNAMO22205621_ARN
	STORAGE_DYNAMO22205621_NAME
	STORAGE_DYNAMO22205621_STREAMARN
	STORAGE_S369DBA687_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { AmplifyClient, ListBranchesCommand, DeleteBranchCommand } = require("@aws-sdk/client-amplify");
const { APIGatewayClient, UpdateApiKeyCommand } = require("@aws-sdk/client-api-gateway");

const amplifyClient = new AmplifyClient({ region: process.env.REGION });
const apigatewayClient = new APIGatewayClient({ region: process.env.REGION });

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    await disconnectAmplifyBranches();
    await disableApiGatewayKey();

    return {
      statusCode: 200,
      body: JSON.stringify("Emergency shutdown completed successfully"),
    };
  } catch (error) {
    console.error("Error during emergency shutdown:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error during emergency shutdown: ${error.message}`),
    };
  }
};

async function disconnectAmplifyBranches() {
  try {
    const branches = await listBranches();
    for (const branch of branches) {
      try {
        await amplifyClient.send(new DeleteBranchCommand({
          appId: process.env.AMPLIFY_PROJECT_ID,
          branchName: branch.branchName
        }));
        console.log(`Branch disconnected: ${branch.branchName}`);
      } catch (error) {
        console.error(`Error disconnecting branch ${branch.branchName}:`, error);
      }
    }
  } catch (error) {
    console.error("Error disconnecting Amplify branches:", error);
  }
}

async function listBranches() {
  try {
    const response = await amplifyClient.send(new ListBranchesCommand({
      appId: process.env.AMPLIFY_PROJECT_ID
    }));
    console.log("Branches retrieved:", response.branches.map(branch => branch.branchName));
    return response.branches;
  } catch (error) {
    console.error("Error listing branches:", error);
    return [];
  }
}

async function disableApiGatewayKey() {
  try {
    await apigatewayClient.send(new UpdateApiKeyCommand({
      apiKey: process.env.APIGATEWAY_KEY_ID,
      patchOperations: [
        {
          op: "replace",
          path: "/enabled",
          value: "false"
        }
      ]
    }));
    console.log(`API key disabled: ${process.env.APIGATEWAY_KEY_ID}`);
  } catch (error) {
    console.error("Error disabling API Gateway key:", error);
  }
}