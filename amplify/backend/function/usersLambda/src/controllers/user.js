const UserService = require("../services/user");
const { getUserCognitoData, handleRefreshTokenFlow } = require("../utils");

async function getUser(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ error: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userSk = userCognitoData.sub;
    const user = await UserService.getUser(userSk);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error from route:", error.message || error);
    res.status(400).json({ error: "An error occurred when trying to get the user" });  
  }
}

async function getUserVoted(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ error: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userSk = userCognitoData.sub;
    const user = await UserService.getUser(userSk);
    res.status(200).json(user.voted_sk);
  } catch (error) {
    console.error("Error from route:", error.message || error);
    res.status(400).json({ error: "Could not get user's voted artwork" });  
  }
}

async function registerUser(req, res)  {
  const { email, password, f_name, l_name, birthdate } = req.body;
  const userData = { email, password, f_name, l_name, birthdate };
  
  try {
    const userSuccessMessage = await UserService.registerUser(userData);
    res.status(201).json(userSuccessMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
}

async function verifyUser(req, res) {
  const { email, verificationCode } = req.body;
  try {
    const userInfo = await UserService.getStatusAndSubFromId(email);
    const user = await UserService.verifyUser(userInfo.sub, email, verificationCode);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
}

async function sendVerificationEmail(req, res) {
  const { email } = req.body;
  try {
    const response = await UserService.sendVerificationEmail(email);
    if (response.$metadata.httpStatusCode === 200) {
      res.status(200).json({ message: "Verification email resent successfully" });
    } else {
      res.status(500).json({ error: "Failed to resend verification email" });
    }
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
}

async function getAuthStatus(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    if (userCognitoData) {
      if (userCognitoData.sub) {
        res.status(200).json({message: userCognitoData.sub});
      } else {
        res.status(400).json({error: "User ID not found"});
      }
    } else {
      res.status(401).json({error: "Invalid or expired access token"});
    }
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: "Authentication failed"});
  }
}

async function getVolunteerAuthStatus(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    if (userCognitoData) {
      if (userCognitoData.nickname == "Volunteer") {
        res.status(200).json({ message: "Authenticated as a volunteer." });
      } else {
        res.status(400).json({ error: "User is not a volunteer."});
      }
    } else {
      res.status(401).json({ error: "Invalid or expired access token" });
    }
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: "Authentication failed"});
  }
}

async function refundUser(req, res) {
  const userSk = req.params.userSk;
  
  if (!req.cookies.accessToken) {
    return res.status(401).json({error: "No access token provided"});
  }

  try {
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userNick = userCognitoData.nickname;
    
    if (userNick === "Volunteer") {
      try {
        const refundedUserId = await UserService.refundUser(userSk);
        res.status(200).json(refundedUserId);
      } catch(error) {
        console.error(error);
        res.status(400).json({error: "Refunding user failed due to unknown error"});
      }
    } else {
      res.status(403).json({error: "User is not authenticated as a volunteer."});
    }
  } catch (error) {
    console.error("Error getting user Cognito data:", error);
    res.status(500).json({error: "Error authenticating user"});
  }
}

async function login(req, res)  {
  const { email, password } = req.body;

  try {
    const response = await UserService.login(email, password);
    const { AccessToken, IdToken, RefreshToken, ExpiresIn } = response;
    let sameSiteValue = "Lax";
    
    res.cookie("accessToken", AccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: sameSiteValue,
      maxAge: ExpiresIn * 1000
    });
    res.cookie("idToken", IdToken, {
      httpOnly: true,
      secure: true,
      sameSite: sameSiteValue,
      maxAge: ExpiresIn * 1000
    });
    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: sameSiteValue,
      maxAge: 86400000
    });
    res.status(201).json(response);
  } catch(error) {
    console.error("Login error:", error);
    res.status(401).json({ error: "Login failed" });
  }
}

async function logout(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in"});
    }

    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent

    // Clear the cookies
    res.clearCookie("accessToken");
    res.clearCookie("idToken");
    res.clearCookie("refreshToken");

    // Invalidate the token on the Cognito side
    const currentAccessToken = req.cookies.accessToken;
    if (currentAccessToken) {
      await UserService.logout(currentAccessToken);
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
}

async function deleteUser(req, res) {
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userSk = userCognitoData.sub;
  const token = req.headers.authentication?.split(" ")[1];

  try {
    await UserService.deleteUser(userSk, token);
    res.status(204).send();
  } catch(error) {
    console.error("error deleting user");
    res.status(400).json({error: "Error deleting user"});
  }
}

async function userDeleteAccount(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in" });
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return; // Exit execution if response has already been sent

    const userCognitoData = await getUserCognitoData(accessToken);
    const userSk = userCognitoData.sub;
    const userEmail = userCognitoData.email;
    const result = await UserService.userDeleteAccount(userSk, userEmail);
    
    if (result.success) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Account successfully deleted" });
    } else {
      console.error(result.message);
      res.status(400).json({ error: "Error deleting account" });
    }

  } catch(error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error while deleting account" });
  }
}

async function forgotPassword(req, res) {
  try {
    const forgotPasswordResponse = await UserService.forgotPassword(req.body.email);
    res.status(200).json(forgotPasswordResponse);
  } catch (error) {
    console.error(error);
    res.status(400).json({error: "failed to initiate forgot password flow"});
  }
}

async function confirmForgotPassword(req, res) {
  const reqArgs = { confirmationCode: req.body.confirmationCode, newPassword: req.body.newPassword, email: req.body.email };
  try {
    const confirmForgotPasswordResponse = await UserService.confirmForgotPassword(reqArgs);
    res.status(200).json(confirmForgotPasswordResponse);
  } catch (error) {
    console.error(error);
    res.status(400).json({error: "Failed to reset password"});
  }
}

async function updateUser(req, res) {
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userSk = userCognitoData.sub;

  try {
    const updatedUser = await UserService.updateUser(userSk, req.body);
    res.status(200).json(updatedUser);
  } catch(error) {
    console.error(error);
    res.status(400).json({error: "Failed to update user" });
  }
}

async function volunteerUpdateUser(req, res) {
  const userSk = req.params.userSk;
  
  if (!req.cookies.accessToken) {
    return res.status(401).json({message: "No access token provided"});
  }

  try {
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userNick = userCognitoData.nickname;
    
    if (userNick === "Volunteer") {
      try {
        const updatedUser = await UserService.volunteerUpdateUser(userSk, req.body);
        res.status(200).json(updatedUser);
      } catch(error) {
        console.error(error);
        res.status(400).json({error: "Updating user failed"});
      }
    } else {
      res.status(403).json({error: "User is not authenticated as a volunteer."});
    }
  } catch (error) {
    console.error("Error getting user Cognito data:", error);
    res.status(500).json({error: "Error authenticating user"});
  }
}

module.exports = {
  getUser,
  registerUser,
  verifyUser,
  login,
  logout,
  deleteUser,
  forgotPassword,
  updateUser,
  volunteerUpdateUser,
  getAuthStatus,
  getVolunteerAuthStatus,
  getUserVoted,
  sendVerificationEmail,
  confirmForgotPassword,
  refundUser,
  userDeleteAccount
};