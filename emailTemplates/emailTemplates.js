export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Result Tracker Pro</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  </style>
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <!-- Header with logo -->
  <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 30px 20px; text-align: center;">
    <img src="https://via.placeholder.com/150x50/ffffff/4CAF50?text=ResultTracker" alt="Result Tracker Logo" style="max-width: 200px;">
    <h1 style="color: white; margin: 15px 0 0; font-weight: 600;">Welcome to Result Tracker Pro!</h1>
  </div>

  <!-- Main content -->
  <div style="background-color: #f9f9f9; padding: 30px 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <p style="margin-bottom: 20px;">Dear {username},</p>
    
    <p style="margin-bottom: 20px;">Thank you for joining <strong>Result Tracker Pro</strong>, your comprehensive solution for managing and tracking academic results efficiently.</p>
    
    <div style="text-align: center; margin: 25px 0;">
      <img src="https://via.placeholder.com/500x250/e8f5e9/4CAF50?text=Track+Results+Easily" alt="Dashboard Preview" style="max-width: 100%; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    </div>
    
    <h2 style="color: #2E7D32; margin-top: 30px; font-size: 20px;">Get Started</h2>
    <p style="margin-bottom: 15px;">Here's what you can do now:</p>
    <ul style="margin-bottom: 25px; padding-left: 20px;">
      <li style="margin-bottom: 8px;">📊 Upload and manage student results</li>
      <li style="margin-bottom: 8px;">📈 Generate insightful performance reports</li>
      <li style="margin-bottom: 8px;">🔔 Set up automated notifications</li>
      <li style="margin-bottom: 8px;">👥 Collaborate with your team members</li>
    </ul>
    
    <div style="background-color: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0;">
      <p style="margin: 0; font-style: italic;">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
    </div>
    
    <!-- Verification Code Section -->
    <div style="margin: 30px 0; text-align: center;">
      <p style="margin-bottom: 10px;">To complete your registration, please verify your email with this code:</p>
      <div style="background-color: #ffffff; border: 1px solid #E0E0E0; padding: 15px; display: inline-block; border-radius: 5px; margin: 10px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #4CAF50;">{verificationCode}</span>
      </div>
      <p style="font-size: 0.8em; color: #888; margin-top: 10px;">This code will expire in 15 minutes.</p>
    </div>
    
    <div style="text-align: center; margin: 20px 0;">
      <a href="{dashboardURL}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">Go to Dashboard</a>
    </div>
    
    <p style="margin-bottom: 5px;">Need help getting started? Check out our <a href="{helpCenterURL}" style="color: #4CAF50; text-decoration: none;">Help Center</a>.</p>
    
    <p style="margin-top: 30px;">We're excited to have you on board!</p>
    
    <p style="margin-bottom: 5px;">Best regards,</p>
    <p style="margin-top: 0; font-weight: 600;">The Result Tracker Team</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 15px;">
    <p style="margin: 5px 0;">© ${new Date().getFullYear()} Result Tracker Pro. All rights reserved.</p>
    <p style="margin: 5px 0;">123 Education Street, Academic City, 100001</p>
    <p style="margin: 5px 0;">
      <a href="{privacyURL}" style="color: #888; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="{termsURL}" style="color: #888; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    </p>
    <p style="margin: 5px 0; font-size: 0.7em;">This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Result Tracker Pro</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  </style>
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0;">
  <!-- Header with logo -->
  <div style="background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 30px 20px; text-align: center;">
    <img src="https://via.placeholder.com/150x50/ffffff/4CAF50?text=ResultTracker" alt="Result Tracker Logo" style="max-width: 200px;">
    <h1 style="color: white; margin: 15px 0 0; font-weight: 600;">Welcome to Result Tracker Pro!</h1>
  </div>

  <!-- Main content -->
  <div style="background-color: #f9f9f9; padding: 30px 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <p style="margin-bottom: 20px;">Dear {username},</p>
    
    <p style="margin-bottom: 20px;">Thank you for joining <strong>Result Tracker Pro</strong>, your comprehensive solution for managing and tracking academic results efficiently.</p>
    
    <div style="text-align: center; margin: 25px 0;">
      <img src="https://via.placeholder.com/500x250/e8f5e9/4CAF50?text=Track+Results+Easily" alt="Dashboard Preview" style="max-width: 100%; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    </div>
    
    <h2 style="color: #2E7D32; margin-top: 30px; font-size: 20px;">Get Started</h2>
    <p style="margin-bottom: 15px;">Here's what you can do now:</p>
    <ul style="margin-bottom: 25px; padding-left: 20px;">
      <li style="margin-bottom: 8px;">📊 Upload and manage student results</li>
      <li style="margin-bottom: 8px;">📈 Generate insightful performance reports</li>
      <li style="margin-bottom: 8px;">🔔 Set up automated notifications</li>
      <li style="margin-bottom: 8px;">👥 Collaborate with your team members</li>
    </ul>
    
    <div style="background-color: #E8F5E9; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; border-radius: 0 5px 5px 0;">
      <p style="margin: 0; font-style: italic;">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{dashboardURL}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">Go to Dashboard</a>
    </div>
    
    <p style="margin-bottom: 5px;">Need help getting started? Check out our <a href="{helpCenterURL}" style="color: #4CAF50; text-decoration: none;">Help Center</a>.</p>
    
    <p style="margin-top: 30px;">We're excited to have you on board!</p>
    
    <p style="margin-bottom: 5px;">Best regards,</p>
    <p style="margin-top: 0; font-weight: 600;">The Result Tracker Team</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 15px;">
    <p style="margin: 5px 0;">© ${new Date().getFullYear()} Result Tracker Pro. All rights reserved.</p>
    <p style="margin: 5px 0;">123 Education Street, Academic City, 100001</p>
    <p style="margin: 5px 0;">
      <a href="{privacyURL}" style="color: #888; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="{termsURL}" style="color: #888; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    </p>
  </div>
</body>
</html>
`;