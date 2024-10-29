const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    phone: { 
      type: Number, 
      required: true 
    },
    govtId: {
      type: String,
      required: true, 
      trim: true,
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
    rooms: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Room' 
        }
    ]
});

module.exports = mongoose.model("Owner", ownerSchema);