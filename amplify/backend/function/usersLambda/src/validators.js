const { body, validationResult, matchedData, param } = require("express-validator");

const createStringValidator = (field, minLength = 1, maxLength = 255, optional = false) => {
  let chain = body(field);
  if (optional) {
    chain = chain.optional();
  }
  chain = chain
    .isString().withMessage(`${field} must be a string`)
    .trim()
    .isLength({ min: minLength, max: maxLength }).withMessage(`${field} must be between ${minLength} and ${maxLength} characters`)
    .escape();
  
  return chain;
};

const createParamUUIDValidator = (paramName) => {
  return param(paramName)
    .isUUID().withMessage(`${paramName} must be a valid UUID string`)
    .isLength({ min: 36, max: 36 }).withMessage(`${paramName} must be exactly 36 characters long`);
};

const createBooleanValidator = (field, optional = false) => {
  let chain = body(field).isBoolean().withMessage(`${field} must be a boolean`);
  return optional ? chain.optional() : chain;
};

const nameValidator = [
  createStringValidator("f_name", 1, 50),
  createStringValidator("l_name", 1, 50),
];

const emailValidator = [
  body("email")
    .isEmail().withMessage("email must be a valid email address")
    .isLength({ max: 254 }).withMessage("email must not exceed 254 characters")
    .normalizeEmail()
];

const blacklistEmailValidator = (domainBlacklist, wildcardBlacklist) => [
  body("email")
    .isEmail().withMessage("email must be a valid email address")
    .isLength({ max: 254 }).withMessage("email must not exceed 254 characters")
    .custom((value) => {
      if (process.env.ENV != "production") { return true; }
      const domain = value.split('@')[1].toLowerCase();
      
      if (domainBlacklist.includes(domain)) {
        throw new Error('This email domain is not allowed');
      }
      
      for (let wildcardDomain of wildcardBlacklist) {
        if (wildcardDomain.startsWith('*.')) {
          const suffix = wildcardDomain.slice(1);
          if (domain.endsWith(suffix)) {
            throw new Error('This email domain is not allowed');
          }
        }
      }
      
      return true;
    })
    .normalizeEmail()
];

const verificationCodeValidator = [
  body("verificationCode")
    .isNumeric().withMessage("Verification code must be numeric")
    .isLength({ min: 6, max: 6 }).withMessage("Verification code must be exactly six digits")
];

const passwordValidator = [
  body("password")
    .isString().withMessage("password must be a string")
    .isLength({ min: 8, max: 100 }).withMessage("password must be between 8 and 100 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage("password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
];

const loginUserValidator = [
  ...emailValidator,
  ...passwordValidator,
];

const registerUserValidator = [
  ...loginUserValidator,
  ...nameValidator,
  createStringValidator("birthdate", 1, 20),
];

const verifyUserValidator = [
  ...verificationCodeValidator,
  ...emailValidator,
];

const refundUserValidator = [
  createParamUUIDValidator("userSk")
];

const updateUserValidator = [
  createStringValidator("location", 0, 100, true),
  createStringValidator("g_f_name", 0, 50, true),
  createStringValidator("g_l_name", 0, 50, true),
];

const volunteerUpdateUserValidator = [
  createParamUUIDValidator("userSk"),
  createBooleanValidator("can_submit_art"),
];

const getArtworkValidator = [
  createParamUUIDValidator("artworkSk")
];

const generatePresignedValidator = [
  body("file_type")
    .isString().withMessage("file_type must be a string")
    .isIn(["jpg", "png", "jpeg"]).withMessage("file_type must be jpg, png, or jpeg")
];

const addArtworkValidator = [
  createStringValidator("f_name", 1, 50),
  body("age").isInt({ min: 0, max: 150 }).withMessage("age must be an integer between 0 and 150"),
  createStringValidator("description", 1, 300),
  createStringValidator("sport", 1, 50),
  createStringValidator("location", 1, 100),
  createBooleanValidator("is_ai_gen"),
  createStringValidator("model", 0, 100, true),
  createStringValidator("prompt", 0, 300, true),
  body("file_type")
    .isString().withMessage("file_type must be a string")
    .isIn(["jpg", "png", "jpeg"]).withMessage("file_type must be jpg, png, or jpeg")
];

const approveArtworkValidator = [
  createParamUUIDValidator("artworkSk"),
  createBooleanValidator("is_approved"),
];

const deleteArtworkValidator = [
  createParamUUIDValidator("artworkSk"),
];

const forgotPasswordValidator = [
  ...emailValidator
];

const voteArtworkValidator = [
  createParamUUIDValidator("artworkSk"),
];

const confirmForgotPasswordValidator = [
  ...emailValidator,
  ...passwordValidator,
  createStringValidator("confirmationCode", 6, 6),
];

const resendVerificationValidator = [
  ...emailValidator
];

function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation errors", errors: errors.array() });
  }
  req.validatedData = matchedData(req, { locations: ["body", "query", "params"] });
  next();
}

module.exports = {
  loginUserValidator,
  registerUserValidator,
  verifyUserValidator,
  updateUserValidator,
  volunteerUpdateUserValidator,
  generatePresignedValidator,
  addArtworkValidator,
  approveArtworkValidator,
  validationMiddleware,
  forgotPasswordValidator,
  resendVerificationValidator,
  confirmForgotPasswordValidator,
  refundUserValidator,
  getArtworkValidator,
  deleteArtworkValidator,
  voteArtworkValidator,
  blacklistEmailValidator
};