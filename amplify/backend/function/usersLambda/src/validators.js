const { body, validationResult } = require('express-validator');


const nameValidator = [
    body('f_name').isString().withMessage('f_name must be a string'),
    body('l_name').isString().withMessage('l_name must be a string'),
]

const emailValidator = [
    body('email').isEmail().withMessage('email must be an email'),
]

const uuidValidator = [
    body('sk').isUUID().withMessage('sk must be a UUID string'),
]

const verificationCodeValidator = [
    body('verificationCode')
      .isNumeric().withMessage('Verification code must be numeric')
      .isLength({ min: 6, max: 6 }).withMessage('Verification code must be exactly six digits')
  ];
  
const loginUserValidator = [
    ...emailValidator,
    body('password').isString().withMessage('password must be a string'),
]

const registerUserValidator = [
    ...loginUserValidator,
    ...nameValidator,
    body('birthdate').isString().withMessage('birthdate must be a string'),
]

const verifyUserValidator = [
    ...verificationCodeValidator,
    ...emailValidator,
]

const updateUserValidator = [
    body('location').isString().withMessage('location must be a string'),
    body('g_f_name').isString().withMessage('g_f_name must be a string'),
    body('g_l_name').isString().withMessage('g_l_name must be a string'),
]

const volunteerUpdateUserValidator = [
    body('can_submit_art').isBoolean().withMessage('can_submit_art must be a boolean'),
]

const generatePresignedValidator = [
    body('file_type')
        .isString().withMessage('file_type must be a string')
        .isIn(['jpg', 'png', 'jpeg']).withMessage('file_type contains invalid values')
]

const addArtworkValidator = [
    body('f_name').isString().withMessage('f_name must be a string'),
    body('age').isInt().withMessage('age must be an integer'),
    body('description').isString().withMessage('description must be a string'),
    body('sport').isString().withMessage('sport must be a string'),
    body('location').isString().withMessage('location must be a string'),
    body('is_ai_gen').isBoolean().withMessage('is_ai_gen must be a boolean'),
    body('model').optional().isString().withMessage('model must be a string'),
    body('prompt').optional().isString().withMessage('prompt must be a string'),
    body('file_type')
      .isString().withMessage('file_type must be a string')
      .isIn(['jpg', 'png', 'jpeg']).withMessage('file_type contains invalid values')
];

const approveArtworkValidator = [
    body('is_approved').isBoolean().withMessage('is_approved must be a boolean')
]

const forgotPasswordValidator = [
    ...emailValidator
]

const confirmForgotPasswordValidator = [
    ...emailValidator,
    body('newPassword').isString().withMessage('newPassword must be a string'),
    body('confirmationCode').isString().withMessage('confirmation code must be a string')
]

const resendVerificationValidator = [
    ...emailValidator
]

  
function validationMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation errors", errors: errors.array() });
    }
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
    confirmForgotPasswordValidator
}
