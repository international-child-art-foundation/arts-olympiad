const UserService = require("../services/user");
const { authenticateUserAndReturnId } = require("../utils");

async function getUser(req, res) {
  const userId = authenticateUserAndReturnId(req.body.accessToken);
  
  try {
    const user = await UserService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error from route" + error);
    res.status(400).json({ error });
  }
}

async function registerUser(req, res)  {
  const { email, password, f_name, l_name, location, age, g_f_name, g_l_name, voted_id } = req.body;
  const userData = { email, password, f_name, l_name, location, age, g_f_name, g_l_name, voted_id };
  
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

async function login(req, res)  {
  const { email, password } = req.body;

  try {
    const response = await UserService.login(email, password);
    const { AccessToken, IdToken, RefreshToken, ExpiresIn } = response;
    res.status(201).json(
      { 
        message: "Login successful!", 
        body: { accessToken: AccessToken, idToken: IdToken, refreshToken: RefreshToken, expiresIn: ExpiresIn } 
      }
    );
  } catch(error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
}

async function deleteUser(req, res) {
  const userId = authenticateUserAndReturnId(req.body.accessToken);
  const token = req.headers.authentication?.split(" ")[1];

  try {
    await UserService.deleteUser(userId, token);
    res.status(204).send();
  } catch(error) {
    console.error("error deleting user");
    res.status(400).json({message: "error deleting user", error: error});
  }
}

async function updateUser(req, res) {
  const userId = authenticateUserAndReturnId(req.body.accessToken);

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
  updateUser,
};