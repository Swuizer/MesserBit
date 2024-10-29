const mongoose = require("mongoose");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/deleteAccountRequestTemplate");

const deleteRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now()
    },
    approvalDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    deleteAt: {
        type: Date,  // This field will store when the document should be deleted
        expires: 0,  // TTL index, it will automatically delete the document after 30 days
    }
});

// Pre-save hook to set the deleteAt date 30 days after the approval date
deleteRequestSchema.pre('save', function(next) {
    if (this.status === "Approved" && !this.deleteAt) {
        // this.deleteAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        this.deleteAt = new Date(Date.now() + 5*60*1000); // 5 Minutes from now
    }
    next();
});

async function sendDeleteAccountVerificationEmail(userName, userPhone, userId){
    try{
        const mailResponse = await mailSender(
            "messerbithelp@gmail.com", 
            "Delete Account Request Verification Email from User", 
            emailTemplate(userName, userPhone, userId),
        );
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error){
        console.log("Error occured while sending a mail", error);
        throw error;
    }
}

deleteRequestSchema.pre("save", async function (next) {
    // await sendDeleteAccountVerificationEmail(userName, userPhone, userId);
    // next();
    const deleteRequest = this; // `this` refers to the document being saved
    
    // Assuming `userName` and `userPhone` are retrieved from the associated user
    const user = await User.findById(deleteRequest.userId);
    const url = `http://localhost:3000/deleteProfile/${deleteRequest._id}`;
    if (user) {
        await sendDeleteAccountVerificationEmail(
            user.firstName + " " + user.lastName,
            user.contactNumber,
            // deleteRequest.userId
            url
        );
    }
    
    next();
})

module.exports = mongoose.model("DeleteRequest", deleteRequestSchema);