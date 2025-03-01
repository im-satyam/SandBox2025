const axios = require("axios");
const emailModel = require("../models/emailModel");

const emailCheckController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const response = await axios.get(
      `https://leakcheck.net/api/public?check=${encodeURIComponent(email)}`
    );
    const pwned = response.data.found;
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
const getMail = async (req, res) => {
  try {
    const emails = await emailModel
      .find({ userId: req.body.userId })
      .select("-_id email");
    return res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { emailCheckController, getMail };
