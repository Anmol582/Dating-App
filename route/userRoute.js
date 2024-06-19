const express = require("express")
const router = express.Router()
const Controller= require('../controller/userController')

router.post("/register",Controller.createUserController);

module.exports = router;

