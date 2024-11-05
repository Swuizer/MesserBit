const Owner = require("../models/Owner");

// Admin: Create Owner
exports.createOwner = async (req, res) => {
    try {
        // fetch data
        const { name, phone, govtId, location } = req.body.formData;
      
        // Validate required fields
        if (!name || !phone || !govtId || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields are required" 
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
        // ***** Create entry in DB *****
        const ownerDetails = await Owner.create({
            name: name,
            phone: phone,
            govtId: govtId,
            location: {
                city,
                dist,
                state,
            },
        });
        // console.log(ownerDetails);

        res.status(201).json({
            success: true,
            message: "Owner created successfully", 
            ownerDetails 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating owner", 
            error 
        });
    }
};

// Update Owner
exports.updateOwner = async (req, res) => {
    try {
        // Fetch the data to be updated from the request body
        const { name, phone, govtId } = req.body;

        // Fetch the owner ID from the request parameters
        const ownerId = req.params.id;

        // Validate required fields
        if (!name || !phone || !govtId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find the owner by ID
        const owner = await Owner.findById(ownerId);

        // Check if owner exists
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Owner not found"
            });
        }

        // Update the owner details
        owner.name = name;
        owner.phone = phone;
        owner.govtId = govtId;

        // Save the updated owner details to the database
        await owner.save();

        res.status(200).json({
            success: true,
            message: "Owner updated successfully",
            owner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating owner",
            error
        });
    }
};

const capitalizeWords = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// get all Owners handler function
exports.showAllOwnersByLocation = async (req, res) => {
    try {
        // Extract location from the request body
        const { location } = req.body.formData;

        // Validate if location is provided
        if (!location) {
            return res.status(400).json({
                success: false,
                message: "Location is required",
            });
        }

        const locationParts = location.split(',').map(part => part.trim());

        // if (locationParts.length !== 3) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Location must be in the format "city, state, country"'
        //     });
        // }

        // const [city, dist, state] = locationParts;
        const city = capitalizeWords(locationParts[0]);

        // Find owners in the specific location
        const allOwners = await Owner.find({
            'location.city': city,
        })
        .populate('rooms')
        .exec(); // Populating rooms associated with these owners


        // Find all owners based on the location
        // const allOwners = await Owner.find({ location: location }, { name: true, phone: true, govtId: true, location: true });

        // Check if owners exist in the specified location
        if (allOwners.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No owners found in the specified location",
            });
        }

        // Return success response with the owners
        return res.status(200).json({
            success: true,
            message: "Owners in the specified location returned successfully",
            allOwners,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ********  Get One Owner handler function  ********
// Get One Owner by ID
exports.getOwnerById = async (req, res) => {
    try {
        // Extract ownerId from request parameters
        const { ownerId } = req.params;

        // Find owner details by ID and populate related rooms
        const ownerDetails = await Owner.findById(ownerId)
                                        .populate('rooms')
                                        .exec();

        // Validation: Check if owner exists
        if (!ownerDetails) {
            return res.status(404).json({
                success: false,
                message: `Owner with ID ${ownerId} not found.`,
            });
        }

        // Return response with owner details
        return res.status(200).json({
            success: true,
            message: 'Owner details fetched successfully',
            data: ownerDetails,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getOwnerByPhone = async (req, res) => {
    try {
        // Extract phone number from request parameters
        const { phone } = req.body.formData;

        // Find owner details by phone number and populate related rooms
        const ownerDetails = await Owner.find({ phone })
                                        .populate('rooms')
                                        .exec();

        // Validation: Check if owner exists
        if (!ownerDetails) {
            return res.status(404).json({
                success: false,
                message: `Owner with phone number ${phone} not found.`,
            });
        }

        // Return response with owner details
        return res.status(200).json({
            success: true,
            message: 'Owner details fetched successfully',
            data: ownerDetails,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// app.get('/owners/:ownerId', async (req, res) => {
//     const { ownerId } = req.params;

//     try {
//         // Fetch the owner details using ownerId
//         const owner = await Owner.findById(ownerId);
//         if (!owner) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Owner not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Owner details",
//             owner
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching owner details",
//             error
//         });
//     }
// });
