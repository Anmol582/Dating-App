const {body, validationResult} = require('express-validator');
const response = require("../helper/response.js")
const validaionError = require("../validationError/validationError.js")
const user = require("../model/user.js")

exports.userUpdateValidator = [
  async (req, res, next) => {
    // console.log(req.user.loginStatus)
    switch(req.user.loginStatus){
        case 1:
            await body('fullName').notEmpty().trim().isLength({min: 3}).isLength({max:50}).matches(/^[a-zA-Z\s]+$/).withMessage(validaionError.FULL_NAME_VALIDATION_ERROR).run(req),
            await body('age').notEmpty().isNumeric().toInt().withMessage(validaionError.AGE_VALIDATION_ERROR).run(req),
            await body('gender').notEmpty().withMessage(validaionError.GENDER_VALIDATION_ERROR).run(req)
            break;

        case 2:
            await body('status').notEmpty().withMessage(validaionError.STATUS).run(req),
            await body('bloodType').notEmpty().withMessage(validaionError.BLOODTYPE).run(req),
            await body('height').notEmpty().withMessage(validaionError.HEIGHT).run(req),
            await body('education').notEmpty().withMessage(validaionError.EDUCATION).run(req),
            await body('employement').notEmpty().withMessage(validaionError.EMPOLYEMENT).run(req)
            break;

        case 3:
            await body('countryOfResidence').notEmpty().withMessage(validaionError.COUNTRY).run(req),
            await body('stateOfResidence').notEmpty().withMessage(validaionError.STATE).run(req),
            await body('cityOfResidence').notEmpty().withMessage(validaionError.CITY).run(req),
            await body('nationality').notEmpty().withMessage(validaionError.NATIONALITY).run(req),
            // await body('religion').notEmpty().withMessage(validaionError.GENDER_VALIDATION_ERROR).run(req),
            await body('yourTribe').notEmpty().withMessage(validaionError.YOUR_TRIBE).run(req)
            break;
            
        case 4:
            await body('minAge').notEmpty().withMessage(validaionError.MIN_AGE).run(req),
            await body('maxAge').notEmpty().withMessage(validaionError.MAX_AGE).run(req),
            await body('tribeToDate').notEmpty().withMessage(validaionError.TRIBE_TO_DATE).run(req),
            await body('lookingFor').notEmpty().withMessage(validaionError.LOOKING_FOR).run(req),
            await body('tribeIrrelevant').notEmpty().isBoolean().withMessage(validaionError.TRIBE_IRRELEVANT).run(req)
            break;

        case 5:
            await body('aboutMe').notEmpty().trim().isLength({min: 1}).isLength({max:2000}).withMessage(validaionError.ABOUT_ME).run(req)
            break;

        default:
            return response.errorResponse(res, "Invalid Login Status", null);  // this will never be executed, since loginStatus is checked in middleware before this validation middleware. But just to be safe.
    }
        const valError = validationResult(req);
        if (!valError.isEmpty()) {
            return response.errorResponseWithData(res, validaionError.VALIDATION_FAILED, valError.array());
        }
        next();
    }
];
