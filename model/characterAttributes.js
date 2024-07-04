const mongoose = require("mongoose");
const characterEnum = Object.freeze({
    YES: "yeah100%",
    INBETWEEN: "occasionally 50-50",
    NO: "no way"
})

let characterAttributesSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
   },
   dependableAndReliable: {
        type: String,
        enum: characterEnum,
        required: true,
   },
   outgoingAndExciting: {
    type: String,
        enum: characterEnum,
        required: true,
   },
   bestUnderPressure: {
        type: String,
        enum: characterEnum,
        required: true,
   },
   forgiving: {
        type: String,
        enum: characterEnum,
        required: true,
   },
   influence: {
        type: String,
        enum: characterEnum,
        required: true,
   },
   dateBelowSociaoEconomicClass: {
        type: String,
        enum: characterEnum,
   },
   prude: {
        type: String,
        enum: characterEnum,
   },
   judgemental: {
        type: String,
        enum: characterEnum,
   },
   goodBoy: {
        type: String,
        enum: characterEnum,
   },
   rebel: {
        type: String,
        enum: characterEnum,
   },
   dontCareWhatPeopleSay: {
        type: String,
        enum: characterEnum,
   },
   stronglyWilledPerson: {
        type: String,
        enum: characterEnum,
   },
   peoplePerson: {
        type: String,
        enum: characterEnum,
   },
   sexAndChemistryNumber1Atrraction: {
        type: String,
        enum: characterEnum,
   },
   characterNumber1Atrraction: {
        type: String,
        enum: characterEnum,
   }
   
}, { timestamps: true })

module.exports = mongoose.model("characterAttributes", characterAttributesSchema)