const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    govtId: {
        type: String,
        trim: true,
    },
    // joiningDate: { 
    //     type: Date, 
    //     default: Date.now 
    // }
});

module.exports = mongoose.model("Profile", profileSchema);