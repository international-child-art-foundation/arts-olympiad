const UserService = require("../services/user");
const { getUserCognitoData, handleRefreshTokenFlow } = require("../utils");

async function getUser(req, res) {
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userId = userCognitoData.sub;
    const user = await UserService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error from route:", error.message || error);
    res.status(400).json({ error: error.message || "An unknown error occurred" });  
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
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
}

async function verifyUser(req, res) {
  const { uuid, email, verificationCode } = req.body;

  try {
    const user = await UserService.verifyUser(uuid, email, verificationCode);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Registration failed", error: error.message });
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
      if (userCognitoData.given_name) {
        res.status(200).json({message: userCognitoData.given_name});
      } else {
        res.status(400).json({message: "First name not available"});
      }
    } else {
      res.status(401).json({message: "Invalid or expired access token"});
    }
  } catch(error) {
    console.error(error);
    res.status(400).json({ message: "Authentication failed", error: error.message});
  }
}

async function login(req, res)  {
  const { email, password } = req.body;

  try {
    const response = await UserService.login(email, password);
    const { AccessToken, IdToken, RefreshToken, ExpiresIn } = response;
    let sameSiteValue = "Lax";
    // if (process.env.ENV && process.env.ENV == "staging") {
    //   sameSiteValue = "None"; // In production, this value should be "Lax" to prevent CSRF
    // }
    
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
    res.status(201).json(
      { 
        message: "Login successful!", 
      }
    );
  } catch(error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
}

async function deleteUser(req, res) {
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userId = userCognitoData.sub;
  const token = req.headers.authentication?.split(" ")[1];

  try {
    await UserService.deleteUser(userId, token);
    res.status(204).send();
  } catch(error) {
    console.error("error deleting user");
    res.status(400).json({message: "error deleting user", error: error});
  }
}

async function forgotPassword(req, res) {
  try {
    const forgotPasswordResponse = await UserService.forgotPassword(req.body.email);
    res.status(200).json(forgotPasswordResponse);
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "failed to initiate forgot password flow", error: error.message});
  }
}

async function updateUser(req, res) {
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userId = userCognitoData.sub;

  try {
    const updatedUser = await UserService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch(error) {
    console.error(error);
    res.status(400).json({message: "updating user failed" , error: error.message});
  }
}


module.exports = {
  getUser,
  registerUser,
  verifyUser,
  login,
  deleteUser,
  forgotPassword,
  updateUser,
  getAuthStatus
};