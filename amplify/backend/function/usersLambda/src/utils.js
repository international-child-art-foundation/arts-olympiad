const { CognitoIdentityProviderClient, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const UserModel = require("./models/user") 

const client = new CognitoIdentityProviderClient();

async function getUserCognitoData(authToken) {
  try {
    const command = new GetUserCommand({
      AccessToken: authToken
    });
    const response = await client.send(command);

    const userAttributes = response.UserAttributes.reduce((acc, attribute) => {
      acc[attribute.Name] = attribute.Value;
      return acc;
    }, {});

    return userAttributes; // userAttributes.sub = UUID
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

async function handleRefreshTokenFlow(req, res) {
  if (req.cookies.accessToken) {
    const userAttributes = await getUserCognitoData(req.cookies.accessToken);
    if (userAttributes) {
      return; // Continue with endpoint execution
    } 
  }
  await refreshAccessToken(req, res);
}

async function refreshAccessToken(req, res) {
  if (req.cookies.refreshToken) {
    try {
      const newTokens = await UserModel.getNewTokens(req.cookies.refreshToken);
      const { AccessToken, IdToken, RefreshToken, ExpiresIn } = newTokens.AuthenticationResult;

      if (AccessToken && IdToken) {
        // Successfully refreshed token, set new access token in cookies
        res.cookie("accessToken", AccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
          maxAge: ExpiresIn * 1000
        });
        res.cookie("idToken", IdToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
          maxAge: ExpiresIn * 1000
        });
        req.cookies.accessToken = AccessToken;
        req.cookies.idToken = IdToken;
        if (RefreshToken) { // May not yield new refresh token
          res.cookie("refreshToken", RefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 86400000
          });
          req.cookies.refreshToken = RefreshToken;
        }
        return;  // Continue with endpoint execution
      } else {
        res.status(401).send({ message: "Authentication failed. Please log in again." });
      }
    } catch (error) {
      res.status(401).send({ message: "Failed to refresh access token." });
    }
  } else {
    res.status(401).send({ message: "Missing authentication credentials." });
  }
}


module.exports = {
  getUserCognitoData,
  handleRefreshTokenFlow
};
