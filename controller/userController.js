const response = require('../helper/response');
const user = require("../model/user.js")
const verificationSchema = require('../model/verification.js')
const physicalAttributes = require('../model/physicalAtrributes.js')
const characterAttributes = require('../model/characterAttributes.js')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
const sendMail = require("../config/nodeMailer.js")
require('dotenv').config();
const fs = require("fs");
const path = require('path');
const ejs = require("ejs");

exports.registration = async (req, res) => {
    try {
        const requestData = req.body;
        const findExistingUser = await user.findOne({
            $or: [{ email: requestData.email }, { userName: requestData.userName }]
        })
        if (findExistingUser) {
            if (findExistingUser.email === requestData.email) {
                return response.errorResponse(res, "Email Already Existed");
            }
            else {
                return response.errorResponse(res, "userName Already Existed");
            }
        }
        else {
            await bcrypt.hash(requestData.password, 10)
                .then((data) => {
                    requestData.password = data;
                    return requestData;
                })
                .catch(error => console.error('Error hashing password:', error));
            requestData.loginStatus = 1;
        }
        const createUser = await user.create(requestData);
        const token = JWT.sign({ _id: createUser._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        if (token) {
            if (createUser) {
                return response.createdSuccessfully(res, "User has been created Successfully", createUser, token)
            }
            else {
                return response.errorResponse(res, "Something went Wrong in creating user")
            }
        }
        else {
            return response.errorResponse(res, "Something went Wrong in creating token")
        }

    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.updateUserController = async (req, res) => {
    try {
        const requestData = req.body;
        const id = req.user._id;
        const updatingUser = await user.findOneAndUpdate({ _id: id }, { ...requestData, loginStatus: req.user.loginStatus + 1 }, { new: true })

        return response.updatedSuccessfully(res, "User has been updated Successfully", updatingUser, req.user.loginStatus)  // login

    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.loginController = async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.imageController = async (req, res) => {
    try {
        const { _id, loginStatus } = req.user;
        const newImages = req.files.map(file => file.path)
        const User = await user.findById(_id);
        User.images = [...User.images, ...newImages];
        User.loginStatus = User.loginStatus + 1;

        await User.save();

        return response.updatedSuccessfully(res, "Images have been updated Successfully", User, req.user.loginStatus)  // login
    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.verifyAndAttributes = async (req, res) => {
    try {
        const requestData = req.body;
        const id = req.user._id;

        if (req.user.verificationStatus === "verification") {
            const creation = await verificationSchema.create({ userId: id, ...requestData });
            await user.findOneAndUpdate({ _id: id }, { verificationStatus: "physicalAttributesOfMyself" }, { new: true })
            return response.updatedSuccessfully(res, "User has been updated Successfully", creation, req.user.verificationStatus)
        }
        else if (req.user.verificationStatus === "physicalAttributesOfMyself") {
            const creation = await physicalAttributes.create({ userId: id, ...requestData });
            await user.findOneAndUpdate({ _id: id }, { verificationStatus: "characterAttributes" }, { new: true })
            return response.updatedSuccessfully(res, "User has been updated Successfully", creation, req.user.verificationStatus)
        }
        else if (req.user.verificationStatus === "characterAttributes") {
            const creation = await characterAttributes.create({ userId: id, ...requestData });
            await user.findOneAndUpdate({ _id: id }, { verificationStatus: "physicalAttributesOfPartner" }, { new: true })
            return response.updatedSuccessfully(res, "User has been updated Successfully", creation, req.user.verificationStatus)
        }
        else if (req.user.verificationStatus === "physicalAttributesOfPartner") {
            const creation = await physicalAttributes.create({ userId: id, ...requestData });
            await user.findOneAndUpdate({ _id: id }, { verificationStatus: "done" }, { new: true })
            return response.updatedSuccessfully(res, "User has been updated Successfully", creation, req.user.verificationStatus)
        }
        else {
            return response.errorResponse(res, "no such page exist");
        }
    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.userdetails = async function (req, res) {
    try {
        const id = req.user._id;
        const projection = {
            fullName: 1,
            age: 1,
            gender: 1,
            interestedIn: 1,

            status: 1,
            bodyType: 1,
            height: 1,
            education: 1,
            employement: 1,

            countryOfResidence: 1,
            stateOfResidence: 1,
            cityOfResidence: 1,
            nationality: 1,
            religion: 1,
            yourTribe: 1,

            minAge: 1,
            maxAge: 1,
            tribeToDate: 1,
            lookingFor: 1,

            aboutMe: 1,
            images: 1,

        }
        const User = await user.findOne({ _id: id }, projection);
        return response.userDetails(res, "User fetched Successfully", User)
    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.finalUpdate = async (req, res) => {
    try {
        const updatedData = req.body;
        const id = req.user._id;

        const User = await user.updateOne({ _id: id }, updatedData)

    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.forgetPasswordAndSendMail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const User = await user.findOne({ email: email });

        if (!User) {
            console.log("email dont exist");
            return response.errorResponse(res, "Email does not exist")
        }

        const token = JWT.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        if (token) {
            console.log("token");
        } else {
            return res.end("token is not generated")
        }

        const link = `http://localhost:1234/user/forgetPassword/${token}`
        const templatePath = path.join(__dirname, 'emailTemplate.ejs');
        const html = await ejs.renderFile(path.join(__dirname, "..", "views", "forgetpassword.ejs"), { link });
        console.log(html)
        const data = fs.readFileSync(path.join(__dirname, "..", "views/forgetpassword.ejs"), 'utf8');
        sendMail("'hello from anmol' <anmol@gmail.com>",
            "rahul@gmail.com",
            "hello from anmol kapoor",
            "heyyyyyyy",
            html)
        return response.emailSentSuccessfully(res, "Email sent successfully")

    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        await user.updateOne({ email: email}, {password:hashedPassword})
        
        return res.render('passwordChangedSuccessfully')
    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

exports.forgetPassword1 = async (req, res) => {
    try {
        const { token } = req.params
        if (token) {
            JWT.verify(token, process.env.JWT_SECRET, async (err, data) => {
                console.log(data)
                if (data) {
                    return res.render("forget", { email: data.email })
                }
                else {
                    return res.end("token is not generated")
                }
            });
        } else {
            return response.errorResponse(res, "Token is not provided", null);
        }
    }
    catch (error) {
        console.log(error);
        return response.internalServerErrorResponse(res, "Internal Server Error", error);
    }
}

