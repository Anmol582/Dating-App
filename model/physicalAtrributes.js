const mongoose = require("mongoose");

let physicalAttributesSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
   },
   person: {
        type: String,
        enum: ["self", "partner"],
        required: true,
   },
   size: {
    type: String,
        enum: ["big", "medium", "small"],
        required: true,
   },
   backend: {
        type: String,
        enum: ["well endowed", "normal", "comfortable", "badly flat"],
        required: true,
   },
   facial: {
        type: String,
        enum: ["beautiful", "good looking", "okay", "just okay"],
        required: true,
   },
   height: {
        type: String,
        enum: ["tall", "medium", "short"],
        required: true,
   },
   front: {
        type: String,
        enum: ["well endowed", "normal", "small"],
        required: true,
   },
   glasses: {
        type: String,
        enum: ["yes", "no"],
        required: true,
   }
   
}, { timestamps: true })

module.exports = mongoose.model("physicalAttributes", physicalAttributesSchema)