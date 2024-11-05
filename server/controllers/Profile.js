const Profile = require("../models/Profile");
const User = require("../models/User");
const DeleteRequest = require("../models/DeleteRequest");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
    try{
        // get data
        const {
            dateOfBirth="", 
            about="", 
            govtId="",
            contactNumber=""
        } = req.body;
        // get userId
        const id = req.user.id;
        // validation
        if(!dateOfBirth){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        // find profile
        const userUpdatedDetails = await User.findById(id);
        if(!userUpdatedDetails){
            return res.status(404).json({
                success: true,
                message: "User Not Found"
            });
        }
        const profileId = userUpdatedDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.govtId = govtId;
        userUpdatedDetails.contactNumber = contactNumber;
        await profileDetails.save();
        await userUpdatedDetails.save();

        const userDetails = await User.findById(id)
                                        .populate('additionalDetails')
                                        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            userDetails
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete Account
exports.requestDeleteAccount = async (req, res) => {
    try {
        // Get the user's ID from the request
        const id = req.user.id;
        // console.log("User Id: ", id);

        // Find the user by ID
        const user = await User.findById(id);
        // console.log("User Details: ", user);
        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if a pending delete request already exists for the user
        const existingRequest = await DeleteRequest.findOne({ userId: id, status: "Pending" });
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "A delete request is already pending.",
            });
        }

        // Create a new delete request
        // const deleteRequest = await DeleteRequest.create({
        //     userId: user._id,
        // });
        await DeleteRequest.create({
            userId: user._id,
        });
        // console.log("Delete Request Send", deleteRequest);

        // Return success response
        res.status(200).json({
            success: true,
            message: "Your account deletion request has been submitted and is pending admin approval.",
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: "Something went wrong to sending delete request message",
        });
    }
};

// Controller for Admin to Approve or Reject the Delete Request
exports.adminApproveDeleteRequest = async (req, res) => {
    try {
        // const {  } = req.params;
        const { action, requestId } = req.body; // Action can be 'Approved' or 'Rejected'

        // console.log("Action and RequestId: ", action, requestId);
        // Find the delete request by ID
        const deleteRequest = await DeleteRequest.findById(requestId);
        if (!deleteRequest || deleteRequest.status !== 'Pending') {
            return res.status(404).json({
                success: false,
                message: 'Delete request not found or already processed',
            });
        }

        if (action === 'Approved') {
            // Find user details
            const userDetails = await User.findById(deleteRequest.userId);
            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            // Delete Profile
            await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

            // Delete User
            await User.findByIdAndDelete({ _id: deleteRequest.userId });

            // Update the request status and set approval date
            deleteRequest.status = 'Approved';
            deleteRequest.approvalDate = new Date();
            await deleteRequest.save();

            return res.status(200).json({
                success: true,
                message: "User account deleted successfully.",
            });
        } else if (action === 'Rejected') {
            // If admin rejects the request, update the status
            deleteRequest.status = 'Rejected';
            await deleteRequest.save();

            return res.status(200).json({
                success: true,
                message: "Delete request has been rejected.",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid action. Action must be 'Approved' or 'Rejected'.",
            });
        }
    } catch (error) {
        // console.log("Error in adminApproveDeleteRequest: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Could not process the admin action.",
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const id = req.user.id;

        // Find the user details by ID and populate the additionalDetails field
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        // Check if the user was found
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Return the user details
        console.log(userDetails);
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        // Catch any errors and return a 500 error response
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        // Validate if display picture exists
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No display picture provided",
            });
        }

        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        // Upload Image to Cloudinary
        let image;
        try {
            image = await uploadImageToCloudinary(
                displayPicture,
                process.env.FOLDER_NAME,
                1000,
                1000
            );
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed",
                error: uploadError.message,
            });
        }

        // Update the user's display picture in the database
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        });

    } catch (error) {
        // Return error response
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getEnrolledRooms = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user and populate the rooms array
        const userDetails = await User.findById(userId)
                                        .populate("rooms")
                                        .exec();

        // If user not found
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }

        // Return the enrolled rooms
        return res.status(200).json({
            success: true,
            data: userDetails.rooms, // Return rooms instead of UserDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
