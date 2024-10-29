exports.roomEnrollmentEmail = (roomName, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://messerbit-website-link.com"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="MesserBit Logo"></a>
            <div class="message">Room Booking Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Congratulations! You have successfully booked the room <span class="highlight">"${roomName}"</span> through MesserBit. We're delighted to assist you in finding your perfect room!</p>
                <p>Please log in to your dashboard to view further details about your booking, check-in instructions, and payment information.</p>
                <a class="cta" href="https://messerbit-website-link.com/dashboard">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@messerbit.com">support@messerbit.com</a>. We’re here to help!</div>
        </div>
    </body>
    
    </html>`;
};