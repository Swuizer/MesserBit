const Room = require("../models/Room");
const Owner = require("../models/Owner");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/deleteAccountRequestTemplate");
require("dotenv").config();

// Admin: Create Room for an Owner

exports.createRoom = async (req, res) => {
    try{
        // fetch data 
        const { 
            roomName, 
            about, 
            price, 
            roomType, 
            location, 
            availability,
            wifi,
            water,
            electricBill,
            roomCleaning,
            ownerId 
        } = req.body;  // image, availability ---> what about this

        // get thumbnail
        const thumbnails = req.files['images[]'];

        // validation
        if(!roomName || !about || !price || !roomType || !location || !availability || !thumbnails){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }


        // Check if thumbnails is an array or a single file
        const imageArray = Array.isArray(thumbnails) ? thumbnails : [thumbnails];

        // ***** Find the owner first --- check once  *****
        const owner = await Owner.findById(ownerId);

        if (!owner) {
            return res.status(404).json({ 
                success: false,
                message: "Owner not found" 
            });
        }

        // Split the location string into city, state, and country
        const locationParts = location.split(",").map(part => part.trim());

        if (locationParts.length !== 3) {
            return res.status(400).json({
                success: false,
                message: 'Location must be in the format "city, state, country"',
            });
        }
        
        const [city, dist, state] = locationParts;
        
         // Upload images to cloud
         const imageUrls = await Promise.all(
            imageArray.map(async (thumbnail) => {
                try {
                    const uploadedImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
                    return uploadedImage.secure_url;
                } catch (error) {
                    console.error("Error uploading image:", error);
                    return null; // Handle failed upload
                }
            })
        );
        

        // create an entry for new room
        const newRoom = await Room.create({
            roomName,
            about,
            roomOwner: owner._id, // Associate the room with the owner's ID
            price,
            roomType,
            location: {
                city,
                dist,
                state,
            },
            images: imageUrls,
            availability,
            wifi,
            water,
            electricBill,
            roomCleaning
        });

        // add the new room to the user schema of Owner
        await Owner.findByIdAndUpdate(
            {_id: owner._id},
            {
                $push: {
                    rooms: newRoom._id
                }
            },
            {new: true}
        );

        // return response
        return res.status(200).json({
            success: true,
            message: 'Room Created Successfully',
            newRoom
        });
    }
    catch (error){
        // console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Room",
            error: error.message
        })
    }
}

// Admin: Update Room
exports.updateRoom = async (req, res) => {
    try{
        // data input
        const { 
            roomName, 
            about, 
            price, 
            roomType, 
            location, 
            availability,
            wifi, 
            water, 
            electricBill, 
            roomCleaning, 
            roomId 
        } = req.body;
        // data validation
        const thumbnail = req.files.image;

        if(!roomName || !about || !price || !roomType || !location || !availability){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Upload Image to Cloudinary --- Before use this please check this code
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // update data
        const updatedRoom = await Room.findByIdAndUpdate(roomId, 
            {
                roomName,
                about,
                price,
                roomType,
                location: {
                    city: location.city,
                    dist: location.dist,
                    state: location.state,
                    // coordinates: location.coordinates || {},
                },
                image: thumbnailImage.secure_url,
                availability,
                wifi: wifi === 'true',  // Convert to boolean
                water: water === 'true',
                electricBill: electricBill === 'true',
                roomCleaning: roomCleaning === 'true',
            },
            {new: true}
        );
        // return res
        return res.status(200).json({
            success: true,
            message: 'Room Updated Successfully',
            updatedRoom
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update Room, please try again",
            error: error.message
        })
    }
}

// Admin: Delete Room
exports.deleteRoom = async (req, res) => {
    try{
        // Get ID
        const {roomId} = req.params;
        // Use findByIdAndDelete
        await Room.findByIdAndDelete(roomId);
        // Return response 
        return res.status(200).json({
            success: true,
            message: "Room Deleted Successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Room, please try again",
            error: error.message
        })
    }
}

const capitalizeWords = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
// Get all Rooms based on Location
exports.getAllRooms = async (req, res) => {
    try{
        // Fetch data
        const { minPrice, maxPrice} = req.body;
        const location = req.body.formData;
        
        // data validation
        if(!location){
            return res.status(400).json({
                success: false,
                message: 'Location are required'
            });
        }

        // Initialize a filter object with availability check

        const locationParts = location.split(',').map(part => part.trim());

        // if (locationParts.length !== 3) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Location must be in the format "city, state, country"'
        //     });
        // }

        // const [city, dist, state] = locationParts;
        const city = capitalizeWords(locationParts[0]);

        let filter = { availability: { $gt: 0 } };
        filter['location.city'] = city;  // Accessing the nested 'city' field
        // filter['location.dist'] = dist;  // Accessing the nested 'city' field
        // filter['location.state'] = state;  // Accessing the nested 'city' field


      
        // Add price range filters if provided
        if(minPrice && maxPrice){
            filter.price = {$gte : minPrice, $lte: maxPrice};
        } else if(minPrice){
            filter.price = {$gte: minPrice};
        } else if(maxPrice){
            filter.price = {$lte: maxPrice};
        }

        const allRooms = await Room.find(filter).sort({ price: "asc" });


        // If no rooms are found
        if(!allRooms || allRooms.length === 0){
            return res.status(404).json({
                success: false,
                message: "No rooms available with the specified criteria"
            });
        }

        // Return the filtered rooms
        return res.status(200).json({
            success: true,
            message: 'Data for all Rooms fetched successfully.',
            data: allRooms
        })
    }
    catch (error){
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot fetch Rooms details',
            error: error.message
        })
    }
}

// Get Room Details **********
exports.getRoomDetails = async(req, res) => {
    try{
        // get room id
        const {roomId} = req.body;

        // Check if roomId is provided
        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is required.",
            });
        }

        // find room details
        const roomDetails = await Room.findById(roomId)
                                            .populate("roomOwner")
                                            // .populate("ratingAndReviews")
                                            // .populate("userEnrolled")
                                            .exec();
        
        // validation
        if(!roomDetails){
            return res.status(400).json({
                success: false,
                message: `Room with ID ${roomId} not found.`,
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Room details fetched successfully",
            data: roomDetails
        });
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the room details.",
            error: error.message
        });
    }
}

exports.userEnrolled = async (req, res) => {
    try {
        const { roomId, userId } = req.body;

        // Input validation
        if (!roomId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Room and user ID are required.",
            });
        }

        // Enroll user in the room
        const enrolledRoom = await Room.findOneAndUpdate(
            { _id: roomId },
            { $push: { userEnrolled: userId } },
            { new: true }
        );

        if (!enrolledRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        // Add room to the user's list of enrolled rooms
        const enrolledUser = await User.findByIdAndUpdate(
            userId,
            { $push: { rooms: roomId } },
            { new: true }
        );

        if (!enrolledUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Send confirmation emails to user and admin
        await Promise.all([
            mailSender(
                enrolledUser.email,
                `Room Booking`,
                `We are processing your booking request and will contact you soon, ${enrolledUser.firstName}.`
            ),
            mailSender(
                "messerbithelp@gmail.com",
                `Room Booking Request from User`,
                `<div class="details">
                    <p><strong>User Name:</strong> ${enrolledUser.firstName} ${enrolledUser.lastName}</p>
                    <p><strong>User Phone Number:</strong> ${enrolledUser.contactNumber}</p>
                    <p><strong>User ID:</strong> ${enrolledUser._id}</p>
                </div>`
            )
        ]);

        return res.status(200).json({
            success: true,
            message: "User enrolled in room successfully, confirmation emails sent.",
            enrolledRoom,
            enrolledUser
        });
        
    } catch (error) {
        // console.error("Error during user enrollment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during enrollment.",
            error: error.message,
        });
    }
};

// const Room = require("../models/Room");
// const Owner = require("../models/Owner");
// Admin: Create Room for an Owner
// exports.adminCreateRoomForOwner = async (req, res) => {
//     try {
//         const { roomName, about, price, roomType, location } = req.body;
//         const { ownerId } = req.params;

//         // Find the owner first
//         const owner = await Owner.findById(ownerId);

//         if (!owner) {
//             return res.status(404).json({ message: "Owner not found" });
//         }

//         // Create a new room associated with the owner
//         const room = new Room({
//             roomName,
//             about,
//             roomOwner: owner._id, // Associate the room with the owner's ID
//             price,
//             roomType,
//             location,
//         });

//         await room.save();

//         // Add the room to the owner's `rooms` array
//         owner.rooms.push(room._id);
//         await owner.save();

//         res.status(201).json({ message: "Room created and linked to owner successfully", room });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating room", error });
//     }
// };




// **********  Upload Multiple Image  ***********

// exports.createRoom = async (req, res) => {
//     try {
//         // fetch data
//         const { roomName, about, price, roomType, location, availability } = req.body;
//         const { ownerId } = req.body;
//         const images = req.files.images; // Expecting 'images' field for multiple file uploads

//         // validation
//         if (!roomName || !about || !price || !roomType || !location || !availability) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required'
//             });
//         }

//         // ***** Find the owner first --- check once  *****
//         const owner = await Owner.findById(ownerId);

//         if (!owner) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Owner not found"
//             });
//         }

//         // Ensure images are provided
//         if (!images || images.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'At least one image is required'
//             });
//         }

//         // Upload multiple images to Cloudinary and store their URLs
//         const imageUploadPromises = images.map(image => uploadImageToCloudinary(image, process.env.FOLDER_NAME));
//         const uploadedImages = await Promise.all(imageUploadPromises);

//         // Extract the secure URLs from the uploaded images
//         const imageUrls = uploadedImages.map(image => image.secure_url);

//         // Create an entry for the new room
//         const newRoom = await Room.create({
//             roomName,
//             about,
//             roomOwner: owner._id, // Associate the room with the owner's ID
//             price,
//             roomType,
//             location,
//             images: imageUrls, // Store multiple image URLs
//             availability
//         });

//         // Add the new room to the owner schema
//         await Owner.findByIdAndUpdate(
//             { _id: owner._id },
//             { $push: { rooms: newRoom._id } },
//             { new: true }
//         );

//         // Return response
//         return res.status(200).json({
//             success: true,
//             message: 'Room Created Successfully',
//             newRoom
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to create Room",
//             error: error.message
//         });
//     }
// };
