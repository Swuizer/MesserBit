const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    roomId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Room", 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    review: {           // Comments
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);