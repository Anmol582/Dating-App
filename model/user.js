const mongoose = require("mongoose");

const GenderEnum = Object.freeze({
    MALE: "male",
    FEMALE: "female"
})

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: "",
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    referralCode: {
        type: String,
    },
    fullName: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: GenderEnum,
        default: GenderEnum.FEMALE 
    },
    interestedIn: {
        type: String,
        enum: GenderEnum,
        default: GenderEnum.FEMALE 
    },
    status: {
        type: String,
    },
    bloodType: {
        type: String,
    },
    height: {
        type: String,
    },
    education: {
        type: String,
    },
    employement: {
        type: String,
    },
    countryOfResidence: {
        type: String,
    },
    stateOfResidence: {
        type: String,
    },
    cityOfResidence: {
        type: String,
    },
    nationality: {
        type: String,
    },
    religion: {
        type: String,
    },
    yourTribe: {
        type: String,
    },
    minAge: {
        type: Number,
    },
    maxAge: {
        type: Number,
    },
    tribeToDate: {
        type: String,       
    },
    lookingFor: {
        type: String,
    },
    tribeIrrelevant:{
        type: Boolean
    },
    aboutMe: {
        type: String,
    },
    images: {
        type: [String],
    },
    facebookCode: {
        type: String,
    },
    gvtId: {
        type: [String],
    },
    userImageVerification: {
        type: String,
    },
    otpVerify: {
    type: String,
    },
    loginStatus: {
        type: Number,
        default: 0,
    },
    verificationStatus: {
        type: String,
        default: "verification"
    }
}, { timestamps: true })
module.exports = mongoose.model("user", userSchema)