const { body, validationResult } = require('express-validator');


const nameValidator = [
    body('f_name').isString().withMessage('f_name must be a string'),
    body('l_name').isString().withMessage('l_name must be a string'),
]

const emailValidator = [
    body('email').isEmail().withMessage('email must be an email'),
]

const uuidValidator = [
    body('id').isUUID().withMessage('id must be a UUID string'),
]

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
    ...uuidValidator,
    ...emailValidator,
    body('verificationCode').isInt().withMessage('verificationCode must be an integer')
]

const addArtworkValidator = [
    ...uuidValidator,
    ...nameValidator,
    body('age').isInt().withMessage('age must be an integer'),
    body('title').isString().withMessage('title must be a string'),
    body('sport').isString().withMessage('sport must be a string'),
    body('location').isString().withMessage('location must be a string'),
    body('is_ai_gen').isBoolean().withMessage('is_ai_gen must be a boolean'),
    body('model').optional().isString().withMessage('model must be a string'),
    body('prompt').optional().isString().withMessage('prompt must be a string'),
];

// TODO: add the rest of the validators

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
    addArtworkValidator,
    validationMiddleware
}
