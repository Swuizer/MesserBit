// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Room Controllers Import
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRooms,
    getRoomDetails,
    userEnrolled

} = require("../controllers/Room");

// Owner Controllers Import
const {
    createOwner, 
    updateOwner, 
    showAllOwnersByLocation, 
    getOwnerById,
    getOwnerByPhone
} = require("../controllers/Owner");

// Rating Controllers Imports
// const {
//     createRating,
//     getAverageRating,
//     getAllRating,
//   } = require("../controllers/RatingAndReview");

// Importing Middlewares
const {auth, isUser, isAdmin} = require("../middlewares/auth");


// ********************************************************************************************************
//                                      Room routes
// ********************************************************************************************************

// Room and Owner can Only be Created by Admin
// Create Owner
router.post("/createOwner", auth, isAdmin, createOwner);

// Add a Room to a Owner
router.post("/createRoom", auth, isAdmin, createRoom);

// Update a Room
router.put("/updateRoom", auth, isAdmin, updateRoom);

// Delete a Room
router.delete("/deleteRoom", auth, isAdmin, deleteRoom);

// Get all Registered Rooms based on location
router.post("/getAllRooms", getAllRooms);

// Get Details for Specific Room
router.post("/getRoomDetails", getRoomDetails);


// User Enroll for Specific Room
router.post("/userEnrolled", userEnrolled);

// ********************************************************************************************************
//                                      Owner routes
// ********************************************************************************************************


// Update Owner Details
router.put("/updateOwner", auth, isAdmin, updateOwner);

// Get all Registered Owner Details
router.post("/getAllOwner", auth, isAdmin, showAllOwnersByLocation);

// Get Owner by Phone
router.post("/getOwnerByPhone", auth, isAdmin, getOwnerByPhone);

// Get Owner by ID
router.get("/getOwnerDetails/:ownerId", auth, isAdmin, getOwnerById);

module.exports = router;


/* 

Use PUT for updates (e.g., updating rooms and owners).
Use DELETE for deletions (e.g., deleting rooms).
For fetching details by ID or other queries, prefer GET with URL parameters rather than POST.

*/