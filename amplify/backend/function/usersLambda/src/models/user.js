const { ddbDocClient } = require("../lib/dynamoDBClient");
const { DeleteCommand, GetCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { SignUpCommand, ConfirmSignUpCommand, CognitoIdentityProviderClient, AuthFlowType, InitiateAuthCommand, DeleteUserCommand } = require("@aws-sdk/client-cognito-identity-provider");

let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const client = new CognitoIdentityProviderClient({});


async function getUserById(userId) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userId
    },
    ProjectionExpression: "id, f_name, l_name, #loc, age, email, g_f_name, g_l_name, voted_id, can_submit_art",
    ExpressionAttributeNames: { "#loc": "location" },
  };
  try {
    const response = await ddbDocClient.send(new GetCommand(input));
    return response;
  } catch (error) {
    console.error("Error getting user from Db", error);
    throw error;
  }
}

async function createCognitoUser(email, password) {
  try {
    const command = new SignUpCommand({
      ClientId: "26h0ul3gca5v4kevgl13dhhsur", 
      Username: email,
      Password: password,
      UserAttributes: [] 
    }); 
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("error creating cognito user");
    throw error;
  }
}

async function createUser(signUpResult, userDetails) {
  try {
    const user = {
      pk: "USER",
      sk: signUpResult.UserSub,
      id: signUpResult.UserSub, // uuid created for User name if not specified
      ...userDetails,
      can_submit_art: false 
    };

    const input = {
      TableName: tableName,
      Item: user
    };

    await ddbDocClient.send(new PutCommand(input));
    return user.id;
  } catch (error) {
    console.error("error saving user info to db");
    throw error;
  }
}

async function confirmCognitoUser(email, verificationCode) {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: "26h0ul3gca5v4kevgl13dhhsur", //change clientId to web
      Username: email,
      ConfirmationCode: verificationCode
    });
    return await client.send(command);
  } catch (error) {
    console.error("error with verification code or interacting with cognito");
    throw error;
  }
}

async function signIn(email, password) {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
      ClientId: "26h0ul3gca5v4kevgl13dhhsur", // ** double check clientId
    });

    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("error signing into cognito");
    throw error;
  }
}

async function deleteCognitoUser(token) {
  try {
    const command = new DeleteUserCommand({ AccessToken: token });
    return await client.send(command);
  } catch (error) {
    console.error("error deleting cognito user");
    throw error;
  }
}

async function deleteUserData(userId) {
  try {
    const input = {
      TableName: tableName,
      Key: {
        pk: "USER",
        sk: userId
      }
    };
    await ddbDocClient.send(new DeleteCommand(input));
  } catch (error) {
    console.error("error deleting pk:USER from db");
    throw error;
  }
}

async function updateUserById(userId, fieldName, fieldValue) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userId
    },
    ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
    UpdateExpression: "set #fieldName = :fieldValue",
    ExpressionAttributeNames: {
      "#fieldName": fieldName
    },
    ExpressionAttributeValues: {
      ":fieldValue": fieldValue,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const response = await ddbDocClient.send(new UpdateCommand(input));
    return response;
  } catch(error) {
    console.error("error updating user in db");
    throw error;
  }
}

module.exports = {
  getUserById,
  createCognitoUser,
  createUser,
  confirmCognitoUser,
  signIn,
  deleteCognitoUser,
  deleteUserData,
  updateUserById
};