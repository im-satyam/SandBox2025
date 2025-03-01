const nodemailer = require("nodemailer");
const twilio = require("twilio");
const axios = require("axios");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

const sendEmailNotification = async (email, breachSource) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Security Alert: Data Breach Detected!",
    text: `Your email was found in a data breach on: ${breachSource}. Please change your password immediately.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
/*const sendSMSNotification = async (phone, breachSource) => {
        try {
          await twilioClient.messages.create({
            body: `ALERT: Your email was found in a data breach on ${breachSource}. Change your password immediately!`,
            from: TWILIO_PHONE,
            to: phone,
          });
          console.log("SMS sent successfully.");
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
      };*/

const emailAlert = async (req, res) => {
  const { email } = user.email;
  const user = await userModel.findOne({ _id: req.body.userId });

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await axios.get(
      `https://leakcheck.net/api/public?check=${encodeURIComponent(email)}`
    );
    const pwned = response.data.found;
    if (pwned) {
      await sendEmailNotification(user.email, response.data.sources.name);
    }
    return res.json({
      pwned,
      details: response.data,
      message: pwned
        ? "⚠️ This email has been pwned!"
        : "✅ This email is safe.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error checking email", details: error.message });
  }
};
module.exports = emailAlert;
