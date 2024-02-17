const UserModel = require("../models/user");
const ArtworkService = require("./artwork");

async function getUser(userId) {
  const user = await UserModel.getUserById(userId);
  return user.Item;
}

async function registerUser(userData) {
  const { email, password, ...userDetails } = userData;
  const signUpResult = await UserModel.createCognitoUser(email, password);
  await UserModel.createUser(signUpResult, {email, ...userDetails});

  const formattedUser = {
    id: signUpResult.UserSub, // uuid created for User name if not specified
    email,
    ...userDetails,
    can_submit_art: false 
  };
  return formattedUser;
}

async function verifyUser(email, verificationCode) {
  await UserModel.confirmCognitoUser(email, verificationCode);
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