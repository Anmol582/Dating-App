const mongoose = require("mongoose");

let verificationSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
   }
   
}, { timestamps: true })

module.exports = mongoose.model("verification", verificationSchema)