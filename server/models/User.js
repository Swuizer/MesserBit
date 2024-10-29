const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["User","Admin","RoomOwner"],
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male","Female","Others"],
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        }
    ],
    contactNumber: {
        type: Number,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String
    },
    resetPasswordExpires: {
        type: Date,
    },
    stayTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StayTime",
    },
});

module.exports = mongoose.model("user", userSchema);