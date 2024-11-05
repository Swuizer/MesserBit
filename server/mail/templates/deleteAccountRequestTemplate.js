const deleteAccountRequestTemplate = (userName, userPhone, userId) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Delete Account Request - Admin Notification</title>
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
	
			.details {
				font-size: 16px;
				margin-bottom: 20px;
				text-align: left;
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
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://messerbit.com"><img class="logo"
					src="https://i.ibb.co/F7DWD2Z/logo-transparent-png.png" alt="MesserBit Logo"></a>
			<div class="message">Delete Account Request Notification</div>
			<div class="body">
				<p>Dear Admin,</p>
				<p>A user has requested to delete their account. Please review the following details and take appropriate action:</p>
				<div class="details">
					<p><strong>User Name:</strong> ${userName}</p>
					<p><strong>User Phone Number:</strong> ${userPhone}</p>
					<p><strong>User ID:</strong> ${userId}</p>
				</div>
				<p>Once you approve this request, the user's account and all associated data will be permanently deleted.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:messerbitofficial@gmail.com">messerbitofficial@gmail.com</a>.</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = deleteAccountRequestTemplate;
