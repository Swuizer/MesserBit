const express = require("express");
const router = express.Router();
const { auth, isUser, isAdmin } = require("../middlewares/auth");
const {
    updateProfile,
    requestDeleteAccount,
    adminApproveDeleteRequest,
    getUserDetails,
    updateDisplayPicture,
    getEnrolledRooms
} = require("../controllers/Profile");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.post("/deleteProfileRequest", auth, isUser, requestDeleteAccount);
router.put("/deleteProfile", auth, isAdmin, adminApproveDeleteRequest);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);

// Get Enrolled Rooms
router.get("/getEnrolledRooms", auth, getEnrolledRooms);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Export the router for use in the main application
module.exports = router;