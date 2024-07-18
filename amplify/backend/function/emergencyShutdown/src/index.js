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

const { AmplifyClient, ListAppsCommand } = require("@aws-sdk/client-amplify");
const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const { APIGatewayClient, GetRestApisCommand } = require("@aws-sdk/client-api-gateway");


const amplifyClient = new AmplifyClient({ region: process.env.REGION });
const s3Client = new S3Client({ region: process.env.REGION });
const apigatewayClient = new APIGatewayClient({ region: process.env.REGION });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
    
  try {
    // Test Amplify permissions
    const amplifyApps = await amplifyClient.send(new ListAppsCommand({}));
    console.log(`Found ${amplifyApps.apps.length} Amplify apps`);

    // Test S3 permissions
    const s3Buckets = await s3Client.send(new ListBucketsCommand({}));
    console.log(`Found ${s3Buckets.Buckets.length} S3 buckets`);

    // Test API Gateway permissions
    const apis = await apigatewayClient.send(new GetRestApisCommand({}));
    console.log(`Found ${apis.items.length} APIs`);

    return {
      statusCode: 200,
      body: JSON.stringify("Permissions test completed successfully"),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error testing permissions: ${error.message}`),
    };
  }
};
