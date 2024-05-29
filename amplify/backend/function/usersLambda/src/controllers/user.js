const UserService = require("../services/user");

async function getUser(req, res) {
  const userId = req.params.userId;
  
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
  const { email, verification } = req.body;

  try {
    const user = await UserService.verifyUser(email, verification);
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
    res.status(201).json(response);
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
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
  const userId = req.params.userId;

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