const UserModel = require("../models/user");
const ArtworkService = require("./artwork");

async function getUser(userId) {
  const user = await UserModel.getUserById(userId);
  return user.Item;
}

async function registerUser(userData) {
  const { email, password, f_name } = userData;
  const signUpResult = await UserModel.createCognitoUser(email, password, f_name);
  const uuid = await UserModel.createUser(signUpResult, userData);

  // const formattedUser = {
  //   id: signUpResult.UserSub, // uuid created for User name if not specified
  //   email,
  //   ...userDetails,
  //   can_submit_art: false 
  // };
  return {message: uuid};
}

async function verifyUser(uuid, email, verificationCode) {
  await UserModel.confirmCognitoUser(email, verificationCode);
  await UserModel.updateUserById(uuid, "can_submit_art", true);
  return {message: "verified"};
}

async function login(email, password) {
  const authResponse = await UserModel.signIn(email, password);
  return authResponse.AuthenticationResult;
}

async function deleteUser(userId, token) {
  await UserModel.deleteCognitoUser(token);
  await UserModel.deleteUserData(userId);
  // 
  await ArtworkService.deleteArtwork(userId); 
  return;
}

async function updateUser(userId, updateField) {
  const fieldName = Object.keys(updateField)[0];
  const fieldValue = updateField[fieldName];

  const user = await UserModel.updateUserById(userId, fieldName, fieldValue);
  const {pk, sk, ...formattedUser} = user.Attributes;

  return formattedUser;
}

module.exports = {
  getUser,
  registerUser,
  verifyUser,
  login,
  deleteUser,
  updateUser
};