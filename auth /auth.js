// EXTRACT and Verify JWT token
// get users object from token
// validate user (check if user exists in database and other conditions )
// save user in req object for further use.
const response = require('../helper/response');
const jwt = require('jsonwebtoken');
const user = require("../model/user.js");
require('dotenv').config();

exports.auth = ((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return response.errorResponse(res, "Unauthorise User", null);
            }
            const userDetail = await user.findById(data._id);
            req.user = {_id: userDetail._id, userName: userDetail.userName, email: userDetail.email, loginStatus: userDetail.loginStatus, verificationStatus: userDetail.verificationStatus};
            next();
        });
    } else {
        return response.errorResponse(res, "Token is not provided", null);
    }
});
