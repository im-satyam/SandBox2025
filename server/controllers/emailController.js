const axios = require("axios");
const emailModel = require("../models/emailModel");
const dns = require("dns").promises;
const { simpleParser } = require("mailparser");
async function getRealEmail(rawEmail) {
  try {
    const parsed = await simpleParser(rawEmail);
    const headers = parsed.headers;

    let realEmail = "Unknown"; // Default value

    // Ensure 'From' exists before accessing it
    if (parsed.from && parsed.from.value && parsed.from.value.length > 0) {
      realEmail = parsed.from.value[0].address;
    }

    // Extract the 'Return-Path' header (if available)
    const returnPath = headers.get("return-path");
    if (returnPath) {
      realEmail = returnPath.replace(/[<>]/g, "");
    }

    // Extract Authentication-Results (SPF, DKIM, DMARC)
    const authResults = headers.get("authentication-results") || "";

    const spfStatus = authResults.includes("spf=pass") ? "Pass" : "Fail";
    const dkimStatus = authResults.includes("dkim=pass") ? "Pass" : "Fail";
    const dmarcStatus = authResults.includes("dmarc=pass") ? "Pass" : "Fail";

    // Get sender domain and check SPF DNS records
    let senderDomain = "";
    let spfRecordExists = false;

    if (realEmail.includes("@")) {
      senderDomain = realEmail.split("@")[1];

      try {
        const spfRecords = await dns.resolveTxt(senderDomain);
        spfRecordExists = spfRecords.some((record) =>
          record.join(" ").includes("v=spf1")
        );
      } catch (err) {
        console.log(`DNS Lookup Failed for ${senderDomain}: ${err.message}`);
      }
    }

    return {
      realEmail,
      senderDomain,
      spfStatus,
      dkimStatus,
      dmarcStatus,
      spfRecordExists,
    };
  } catch (error) {
    console.error("Error parsing email:", error);
    return { error: "Failed to analyze email" };
  }
}
const emailCheckController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const realEmail = getRealEmail(email);
  try {
    const response = await axios.get(
      `https://leakcheck.net/api/public?check=${encodeURIComponent(realEmail)}`
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
