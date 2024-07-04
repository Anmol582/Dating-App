const {body, validationResult} = require('express-validator');
const response = require("../helper/response.js")
const validaionError = require("../validationError/validationError.js")
const user = require("../model/user.js")
exports.verifictionValidator = [
    async (req, res, next) => {
      switch(req.user.verificationStatus){
          case ("verification"):
              await body('doneDrugs').notEmpty().withMessage(validaionError.DONE_DRUGS).run(req),
              await body('criminalActivity').notEmpty().withMessage(validaionError.CRIMINAL_ACTIVITY).run(req),
              await body('involvedInSexualHarrasment').notEmpty().withMessage(validaionError.INVOLVED_IN_SEXUAL_HARRASMENT).run(req)
              await body('involvedInDomesticHarrasment').notEmpty().withMessage(validaionError.INVOLVED_IN_DOMESTIC_HARRASMENT).run(req)
              await body('doneCrimeRegardingToDrugs').notEmpty().withMessage(validaionError.DONE_CRIME_REGARDING_TO_DRUGS).run(req)
              await body('doneCrimeRegardingToSexualOrDomesticHarrasemnt').notEmpty().withMessage(validaionError.DONE_CRIME_REGARDING_TO_SEXUAL_OR_DOMESTIC_HARRASMENT).run(req)
              await body('otherSeriousCrimes').notEmpty().withMessage(validaionError.OTHER_SERIOUS_CRIMES).run(req)
              await body('AdditionalInfo').withMessage().run(req)
              break;
  
          case ("physicalAttributesOfMyself"):
              await body('person').notEmpty().withMessage(validaionError.PERSON).run(req),
              await body('size').notEmpty().withMessage(validaionError.SIZE).run(req),
              await body('backend').notEmpty().withMessage(validaionError.BACKEND).run(req),
              await body('facial').notEmpty().withMessage(validaionError.FACIAL).run(req),
              await body('height').notEmpty().withMessage(validaionError.HEIGHT).run(req)
              await body('front').notEmpty().withMessage(validaionError.FRONT).run(req)
              await body('glasses').notEmpty().withMessage(validaionError.GLASSES).run(req)
                break;
  
          case ("characterAttributes"):
              await body('dependableAndReliable').notEmpty().withMessage(validaionError.DEPENDABLE_AND_RELIABLE).run(req),
              await body('outgoingAndExciting').notEmpty().withMessage(validaionError.OUTGOING_AND_EXCITING).run(req),
              await body('bestUnderPressure').notEmpty().withMessage(validaionError.BEST_UNDER_PRESSURE).run(req),
              await body('forgiving').notEmpty().withMessage(validaionError.FORGIVING).run(req),
              await body('influence').notEmpty().withMessage(validaionError.INFLUENCE).run(req),
              await body('dateBelowSociaoEconomicClass').withMessage(validaionError.DATE_BELOW_SOCIAO_ECONOMIC_CLASS).run(req)
              await body('prude').withMessage(validaionError.PRUDE).run(req)
              await body('judgemental').withMessage(validaionError.JUDGEMENTAL).run(req)
              await body('goodBoy').withMessage(validaionError.GOOD_BOY).run(req)
              await body('rebel').withMessage(validaionError.REBEL).run(req)
              await body('dontCareWhatPeopleSay').withMessage(validaionError.DONT_CARE_WHAT_PEOPLE_SAY).run(req)
              await body('stronglyWilledPerson').withMessage(validaionError.STRONGLY_WILLED_PERSON).run(req)
              await body('peoplePerson').withMessage(validaionError.PEOPLE_PERSON).run(req)
              await body('sexAndChemistryNumber1Atrraction').withMessage(validaionError.SEX_AND_CHEMISTRY_NUMBER_1_ATRRACTION).run(req)
              await body('characterNumber1Atrraction').withMessage(validaionError.CHARACTER_NUMBER_1_ATTRACTION).run(req)

              break;
              
          case ("physicalAttributesOfPartner"):
              await body('person').notEmpty().withMessage(validaionError.PERSON).run(req),
              await body('size').notEmpty().withMessage(validaionError.SIZE).run(req),
              await body('backend').notEmpty().withMessage(validaionError.BACKEND).run(req),
              await body('facial').notEmpty().withMessage(validaionError.FACIAL).run(req),
              await body('height').notEmpty().withMessage(validaionError.HEIGHT).run(req)
              await body('front').notEmpty().withMessage(validaionError.FRONT).run(req)
              await body('glasses').notEmpty().withMessage(validaionError.GLASSES).run(req)
                break;

           default:
               return response.errorResponse(res, "Invalid verificationPage status", null);  // this will never be executed, since loginStatus is checked in middleware before this validation middleware. But just to be safe.
      }
          const valError = validationResult(req);
          if (!valError.isEmpty()) {
              return response.errorResponseWithData(res, validaionError.VALIDATION_FAILED, valError.array());
          }
          next();
      }
    ]