const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin:0; padding:0;">
    <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
      <h1 style="color: #111827; font-size: 28px; margin-bottom: 10px;">One-Time Password (OTP)</h1>
      <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Hello,</p>
      <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your OTP code is:</p>
      <div style="font-size: 36px; font-weight: bold; color: #4f46e5; padding: 15px 30px; border-radius: 8px; background-color: #e0e7ff; display: inline-block; letter-spacing: 4px; margin-bottom: 20px;">{otp}</div>
      <p style="font-size: 14px; color: #6b7280;">This code is valid for 10 minutes. Do not share it with anyone.</p>
      <a href="#" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Verify Now</a>
      <div style="font-size: 12px; color: #9ca3af; margin-top: 30px;">&copy; 2025 Your Company Name. All rights reserved.</div>
    </div>
  </body>
</html>
`;
module.exports = { VERIFICATION_EMAIL_TEMPLATE };
