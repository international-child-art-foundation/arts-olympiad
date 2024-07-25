const UserModel = require("../models/user");
const ArtworkService = require("./artwork");

async function getUser(userSk) {
  const user = await UserModel.getUserBySk(userSk);
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

async function updateUserPaymentStatus(userSk, updateValue, pi_id) {
  if (updateValue == true) {
    return await UserModel.updateUserSuccessfulPaymentStatus(userSk, pi_id);
  }
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

async function logout(accessToken) {
  return await UserModel.globalSignOut(accessToken);
}

async function deleteUser(userSk, token) {
  await UserModel.deleteCognitoUser(token);
  await UserModel.deleteUserData(userSk);
  // 
  await ArtworkService.deleteArtwork(userSk); 
  return;
}

async function userDeleteAccount(userSk, userEmail) {
  console.log(userEmail);
  try {
    try { // If this second try{} errors, we still return success (user may not have a submission)
      await ArtworkService.deleteArtworkCompletely(userSk);
    } catch (artworkError) {
      console.log("Error deleting artwork during account deletion:", artworkError.message);
    }
    await UserModel.deleteUserData(userSk);
    await UserModel.deleteCognitoUserDetails(userEmail);
    await UserModel.disableUser(userEmail);

    return { success: true, message: "Account successfully deleted" };
  } catch (error) {
    console.error("Error in userDeleteAccount:", error);
    throw error;
  }
}

async function forgotPassword(username) {
  const forgotPasswordResult = await UserModel.forgotPassword(username);
  return forgotPasswordResult;
}

async function confirmForgotPassword(reqArgs) {
  const confirmForgotPasswordResult = await UserModel.confirmForgotPassword(reqArgs);
  return confirmForgotPasswordResult;
}

async function updateUser(userSk, updateField) {
  const fieldName = Object.keys(updateField)[0];
  const fieldValue = updateField[fieldName];
  
  const allowedFields = ["g_f_name", "g_l_name"];
  
  if (allowedFields.includes(fieldName)) {
    try {
      const user = await UserModel.updateUserById(userSk, fieldName, fieldValue);
      const {pk, sk, ...formattedUser} = user.Attributes;
    
      return formattedUser;
    } catch (error) {
      console.error(`Error updating user ${userSk}:`, error);
      throw error;
    }
  } else {
    const error = new Error("Field is not available for user modification.");
    console.error(error.message);
    throw error;
  }
}

async function refundUser(userSk) {
  const userData = await UserModel.getUserBySk(userSk);
  return await UserModel.refundUser(userData.Item.pi_id);
}

async function volunteerUpdateUser(userSk, updateField) {
  const fieldName = Object.keys(updateField)[0];
  const fieldValue = updateField[fieldName];
  
  const allowedFields = ["can_submit_art"];
  
  if (allowedFields.includes(fieldName)) {
    try {
      const user = await UserModel.updateUserById(userSk, fieldName, fieldValue);
      const {pk, sk, ...formattedUser} = user.Attributes;
    
      return formattedUser;
    } catch (error) {
      console.error(`Error updating user ${userSk}:`, error);
      throw error;
    }
  } else {
    const error = new Error("Field is not available for volunteer modification.");
    console.error(error.message);
    throw error;
  }
}

async function getStatusAndSubFromId(email) {
  return await UserModel.getStatusAndSubFromId(email);
}

async function sendVerificationEmail(email) {
  return await UserModel.sendVerificationEmail(email);
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
  getStatusAndSubFromId,
  sendVerificationEmail,
  confirmForgotPassword,
  updateUserPaymentStatus,
  refundUser,
  userDeleteAccount
};