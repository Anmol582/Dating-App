const mongoose = require("mongoose");

let referralSchema = new mongoose.Schema({
    referralCode: {
        type: String,
        require: true
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    referredTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    
}, { timestamps: true })

module.exports = mongoose.model("referralcode", referralSchema)