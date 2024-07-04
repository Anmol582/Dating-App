const mongoose = require("mongoose");

let verificationSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
   },
   doneDrugs: {
        type: Boolean,
        required: true,
   },
   criminalActivity: {
        type: Boolean,
        required: true,
   },
   involvedInSexualHarrasment: {
        type: Boolean,
        required: true,
   },
   involvedInDomesticHarrasment: {
        type: Boolean,
        required: true,
   },
   doneCrimeRegardingToDrugs: {
        type: Boolean,
   },
   doneCrimeRegardingToSexualOrDomesticHarrasemnt: {
        type: Boolean,
        required: true,
   },
   otherSeriousCrimes: {
        type: Boolean,
        required: true,
   },
   AdditionalInfo: {
        type: String,
   }
}, { timestamps: true })

module.exports = mongoose.model("verification", verificationSchema)