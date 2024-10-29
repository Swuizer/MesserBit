const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    // roomId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // }, roomName,about,roomOwner,ratingAndReviews price roomType location image availability userEnrolled
    roomName: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    roomOwner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: Number
    },
    roomType: {
        type: String,
        enum: ["Male", "Female", "Family", "Male & Female"],
        required: true
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true
      },
      dist: {
        type: String,
        required: true,
        trim: true
      },
      state: {
        type: String,
        required: true,
        trim: true
      },
      // Optional coordinates for precise location (optional)
      coordinates: {
        lat: { type: Number },
        lon: { type: Number }
      }
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    availability: {
        type: Number,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true,
        default: false
    },
    water: {
        type: Boolean,
        required: true,
        default: false 
    },
    electricBill: {
        type: Boolean,
        required: true,
        dafault: false
    },
    roomCleaning: {
        type: Boolean,
        required: true,
        dafault: false
    },
    userEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Room", roomSchema);