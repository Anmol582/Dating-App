const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const Controller = require('../controller/userController')
const { registrationValidator } = require('../expressValidator/registratonValidations.js')
const { userUpdateValidator } = require('../expressValidator/userUpdateSchema.js')
const { finalUpdateValidation } = require('../expressValidator/finalUpdateValidation.js')
const { auth } = require('../auth /auth.js')
const upload = require("../config/multer.js")

router.post("/register", registrationValidator, Controller.registration);
router.post("/login", Controller.loginController);
router.put("/update", auth, userUpdateValidator, Controller.updateUserController);
router.put("/images", auth, upload, Controller.imageController)
router.post("/verifyAndAttributes", auth, Controller.verifyAndAttributes);
router.get("/userdetails", auth, Controller.userdetails)
router.post("/finalUpdate", auth, finalUpdateValidation, Controller.finalUpdate)
router.get("/forgetPasswordAndSendMail", auth, Controller.forgetPasswordAndSendMail)
router.get("/forgetPassword/:token", Controller.forgetPassword1)
router.post("/forgetPassword/:token", Controller.forgetPassword)

module.exports = router;

