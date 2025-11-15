const { mailtrapClient, sender } = require("./mailtrap.config");
const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{otp}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);

    throw new Error("Failed to send verification email: " + error.message);
  }
};

// const sendWelcomeEmail = async (email, name) => {
//   const recipient = [{ email }];
//   try {
//     await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Welcome to Our Service",
//       html: `<h1>Welcome, ${name}!</h1><p>Thank you for joining us.</p>`,
//       category: "Welcome Email",
//     });
//   } catch (error) {}
// };

module.exports = { sendVerificationEmail };
