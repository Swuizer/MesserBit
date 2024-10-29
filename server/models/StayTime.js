const mongoose = require("mongoose");

const stayTimeSchema = new mongoose.Schema({
    roomId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Room", 
        required: true 
    },
    // You can specify stay duration in days, weeks, or months
    stayDuration: { 
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model("StayTime", stayTimeSchema);