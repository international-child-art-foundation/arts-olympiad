const { CognitoIdentityProviderClient, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient();

async function authenticateUserAndReturnId(authToken) {
  try {
    const command = new GetUserCommand({
      AccessToken: authToken
    });
    const response = await client.send(command);

    const userAttributes = response.UserAttributes.reduce((acc, attribute) => {
      acc[attribute.Name] = attribute.Value;
      return acc;
    }, {});

    return userAttributes.sub; // User's UUID
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

module.exports = {
  authenticateUserAndReturnId
};
