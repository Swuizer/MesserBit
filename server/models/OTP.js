const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10*60*1000,
    }
});

// a funstion --> to send emails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(
            email, 
            "Verification Email from MesserBit - By AS", 
            emailTemplate(otp),
        );
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error){
        console.log("Error occured while sending a mail", error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);