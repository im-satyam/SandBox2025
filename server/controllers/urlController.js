const axios = require("axios");
const urlModel = require("../models/urlModel");
const cheerio = require("cheerio");
const VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3/urls";
const VIRUSTOTAL_API_KEY =
  "9e808a3b6ccde20e20fa05efdc1a0f8bd1042ca96a3b47c7ce048db610c6a23a";

const urlCheckController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const newUrl = new urlModel({
    userId: req.body.userId,
    url,
  });
  await newUrl.save();

  try {
    // Fetch the HTML content of the website
    const { data: html } = await axios.get(url);

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(html);

    // Example: Extract the release date from a meta tag or specific HTML element
    // You'll need to inspect the target website's HTML structure to find the correct selector
    const releaseDate =
      $('meta[property="article:published_time"]').attr("content") ||
      $("time[datetime]").attr("datetime") ||
      $(".release-date").text().trim();
  } catch (error) {
    console.error("Error fetching or parsing the URL:", error.message);
    res.status(500).json({ error: "Failed to fetch or parse the URL" });
  }
  try {
    const isMalicious = await checkUrlWithVirusTotal(url);
    return res.json({
      url,
      isMalicious,
      message: isMalicious
        ? "⚠️ It is a malicious URL!"
        : "✅ This URL is safe to browse.",
      releaseDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while checking the URL" });
  }
};

async function checkUrlWithVirusTotal(url) {
  try {
    // Step 1: Submit the URL for scanning
    const scanResponse = await axios.post(
      VIRUSTOTAL_API_URL,
      { url },
      {
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Scan Response:", scanResponse.data);

    // Extract the analysis ID from the scan response
    const analysisId = scanResponse.data.data.id;

    // Step 2: Wait for the analysis to complete (polling)
    let reportResponse;
    let attempts = 0;
    const maxAttempts = 10; // Maximum number of attempts to check the report
    const delay = 5000; // Delay between attempts in milliseconds

    while (attempts < maxAttempts) {
      reportResponse = await axios.get(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        {
          headers: {
            "x-apikey": VIRUSTOTAL_API_KEY,
          },
        }
      );

      console.log(
        `Report Response (Attempt ${attempts + 1}):`,
        reportResponse.data
      );

      // Check if the analysis is complete
      if (reportResponse.data.data.attributes.status === "completed") {
        break;
      }

      // Wait before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempts++;
    }

    if (attempts === maxAttempts) {
      throw new Error("Analysis timed out");
    }

    // Check if the URL is malicious
    const { stats } = reportResponse.data.data.attributes;
    return stats.malicious > 0 || stats.suspicious > 0;
  } catch (error) {
    console.error(
      "Error in checkUrlWithVirusTotal:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
const getUrl = async (req, res) => {
  try {
    const urls = await urlModel
      .find({ userId: req.body.userId })
      .select("-_id url");
    return res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { urlCheckController, getUrl };
