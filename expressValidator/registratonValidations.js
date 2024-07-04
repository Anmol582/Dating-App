const {body, validationResult} = require('express-validator');
const response = require("../helper/response.js")
const validaionError = require("../validationError/validationError.js")

exports.registrationValidator = [
    body('userName').trim().exists().notEmpty().withMessage(validaionError.NAME_VALIDATION_ERROR),
    body('email').isLength({ min: 1 }).trim().withMessage(validaionError.EMAIL_VALIDATION_ERROR).bail()
        .isEmail().withMessage(validaionError.EMAIL_VALIDATION_ERROR),
    body('password').isLength({ min: 8 }).trim().withMessage(validaionError.PASSWORD_VALIDATION_ERROR),
    (req, res, next) => {
        const valError = validationResult(req);
        if (!valError.isEmpty()) {
            return response.errorResponseWithData(res, validaionError.VALIDATION_FAILED, valError.array());
        }
        next();
    }
];