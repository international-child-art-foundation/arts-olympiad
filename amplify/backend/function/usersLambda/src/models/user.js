const { ddbDocClient } = require("../lib/dynamoDBClient");
const { DeleteCommand, GetCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { SignUpCommand, ConfirmSignUpCommand, CognitoIdentityProviderClient, 
  AuthFlowType, InitiateAuthCommand, DeleteUserCommand, ForgotPasswordCommand,
  ConfirmForgotPasswordCommand, GlobalSignOutCommand, AdminGetUserCommand, 
  ResendConfirmationCodeCommand, AdminDeleteUserAttributesCommand, AdminDisableUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const stripe = require("stripe")(process.env.STRIPE_SK);


let tableName = process.env.DYNAMO_TABLE_NAME;
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

let userPoolId = process.env.COGNITO_USERPOOL_ID;
let clientId = process.env.COGNITO_CLIENT_ID;

const client = new CognitoIdentityProviderClient({});


async function getUserBySk(userSk) {
  // Validation checks mostly for debugging
  if (!userSk) {
    throw new Error("Absent userSk: userSk is required.");
  }
  if (typeof userSk !== "string") {
    throw new Error("Invalid userSk: userSk must be a string.");
  }
  if (userSk.length <= 5) {
    throw new Error("Invalid userSk: userSk must be longer than 5 characters.");
  }

  const input = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userSk
    },
    ProjectionExpression: "sk, f_name, l_name, birthdate, #loc, age, email, g_f_name, g_l_name, voted_sk, can_submit_art, has_active_submission, has_paid, pi_id",
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

async function createCognitoUser(email, password, f_name) {
  try {
    const command = new SignUpCommand({
      ClientId: clientId, 
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "given_name", Value: f_name }
      ] 
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
      f_name: userDetails.f_name,
      l_name: userDetails.l_name,
      birthdate: userDetails.birthdate,
      has_active_submission: false,
      can_submit_art: false 
    };

    const input = {
      TableName: tableName,
      Item: user
    };

    await ddbDocClient.send(new PutCommand(input));
    return user.sk;
  } catch (error) {
    console.error("error saving user info to db");
    throw error;
  }
}

async function confirmCognitoUser(email, verificationCode) {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: clientId, //change clientId to web
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
      ClientId: clientId, // ** double check clientId
    });

    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("error signing into cognito");
    throw error;
  }
}

async function globalSignOut(accessToken) {
  try {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error signing out from Cognito");
    throw error;
  }
}

async function getNewTokens(refreshToken) {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
      ClientId: clientId, // ** double check clientId
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

async function deleteCognitoUserDetails(userEmail) {
  try {
    const getUserCommand = new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: userEmail
    });
    const userResponse = await client.send(getUserCommand);

    // List of immutable attributes
    const immutableAttributes = ["sub", "email", "email_verified", "phone_number_verified", "created_at", "updated_at"];

    // Create an array of attributes to delete
    const attributesToDelete = userResponse.UserAttributes
      .filter(attr => !immutableAttributes.includes(attr.Name))
      .map(attr => attr.Name);

    if (attributesToDelete.length > 0) {
      const deleteAttributesCommand = new AdminDeleteUserAttributesCommand({
        UserPoolId: userPoolId,
        Username: userEmail,
        UserAttributeNames: attributesToDelete
      });

      // Send the delete attributes command
      await client.send(deleteAttributesCommand);
    }

    console.log(`User details deleted for user ${userEmail}, keeping immutable attributes`);
    return true;
  } catch (error) {
    console.error("Error deleting Cognito user details:", error);
    throw error;
  }
}

async function disableUser(userEmail) {
  try {
    const disableUserCommand = new AdminDisableUserCommand({
      UserPoolId: userPoolId,
      Username: userEmail
    });
    await client.send(disableUserCommand);

    console.log(`User ${userEmail} account disabled`);
    return true;
  } catch (error) {
    console.error(`Error disabling user account for ${userEmail}:`, error);
    throw error;
  }
}


async function forgotPassword(username) {
  try {
    const input = {
      ClientId: clientId,
      Username: username,
    };
    const command = new ForgotPasswordCommand(input);
    return await client.send(command);
  } catch (error) {
    console.error("Error initiating the forgot password flow.");
    throw error;
  }
}

async function confirmForgotPassword(reqArgs) {
  try {
    const input = {
      ClientId: clientId,
      ConfirmationCode: reqArgs.confirmationCode,
      Username: reqArgs.email,
      Password: reqArgs.newPassword
    };
    const command = new ConfirmForgotPasswordCommand(input);
    return await client.send(command);
  } catch(error) {
    console.error("Forgot password command failed.");
    throw error;
  }
};

async function getStatusAndSubFromId(username) {
  try {
    const input = {
      UserPoolId: userPoolId,
      Username: username,
    };
    const command = new AdminGetUserCommand(input);
    const response = await client.send(command);

    // Extracting the sub attribute from the UserAttributes array
    const subAttribute = response.UserAttributes.find(attr => attr.Name === "sub");
    const sub = subAttribute ? subAttribute.Value : null;

    return {
      status: response.UserStatus,
      sub: sub
    };
  } catch (error) {
    console.error("Error fetching the user's sub from their username");
    throw error;
  }
}

async function deleteUserData(userSk) {
  try {
    const input = {
      TableName: tableName,
      Key: {
        pk: "USER",
        sk: userSk
      }
    };
    await ddbDocClient.send(new DeleteCommand(input));
  } catch (error) {
    console.error("error deleting pk:USER from db");
    throw error;
  }
}

async function refundUser(pi_id) {
  try {
    // Retrieve the PaymentIntent to ensure it exists and to get the amount
    const paymentIntent = await stripe.paymentIntents.retrieve(pi_id);

    if (paymentIntent) {
      // Create the refund
      const refund = await stripe.refunds.create({
        payment_intent: pi_id,
        amount: paymentIntent.amount // Refund the full amount
      });
  
      if (refund.status === "succeeded") {
        console.log(`Refund processed successfully: ${refund.id}`);
        return refund.id;
      } else {
        throw new Error(`Refund failed with status: ${refund.status}`);
      }
    } else {
      console.error(`Error processing refund for payment intent ${pi_id}`);
      throw new Error(`Refund failed with status: ${refund.status}`);
    }
  } catch (error) {
    console.error(`Error processing refund for payment intent ${pi_id}:`, error);
    throw new Error(`Refund failed with status: ${refund.status}`);
  }
}

async function updateUserSuccessfulPaymentStatus(userSk, pi_id) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userSk
    },
    ConditionExpression: "attribute_exists(pk) AND attribute_exists(sk)",
    UpdateExpression: "SET has_paid = :hasPaid, pi_id = :piId",
    ExpressionAttributeValues: {
      ":hasPaid": true,
      ":piId": pi_id
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const response = await ddbDocClient.send(new UpdateCommand(input));
    return response;
  } catch(error) {
    console.error("Error updating user payment status in db:", error);
    throw error;
  }
}

async function updateUserById(userSk, fieldName, fieldValue) {
  const input = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userSk
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

async function sendVerificationEmail(email) {
  try {
    const params = {
      ClientId: clientId,
      Username: email
    };
    const command = new ResendConfirmationCodeCommand(params);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error sending new verification email");
    throw error;
  }
}

module.exports = {
  getUserBySk,
  createCognitoUser,
  createUser,
  confirmCognitoUser,
  signIn,
  globalSignOut,
  deleteCognitoUser,
  forgotPassword,
  deleteUserData,
  updateUserById,
  getNewTokens,
  getStatusAndSubFromId,
  sendVerificationEmail,
  confirmForgotPassword,
  updateUserSuccessfulPaymentStatus,
  refundUser,
  deleteCognitoUserDetails,
  disableUser
};