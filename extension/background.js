chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);

    if (request.action === "checkPhishing") {
        fetchPhishingStatus(request.url)
            .then((status) => sendResponse({ status }))
            .catch((error) => sendResponse({ status: "Error", error: error.message }));

        return true; // Keeps the message port open for async response
    }
});

// Function to fetch the phishing status
async function fetchPhishingStatus(url) {
    const VIRUSTOTAL_API_KEY = "9e808a3b6ccde20e20fa05efdc1a0f8bd1042ca96a3b47c7ce048db610c6a23a"; // Replace with your API key

    try {
        // Step 1: Submit URL for analysis
        const scanResponse = await fetch("https://www.virustotal.com/api/v3/urls", {
            method: "POST",
            headers: {
                "x-apikey": VIRUSTOTAL_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ url }).toString()
        });

        const scanData = await scanResponse.json();
        const scanId = scanData.data.id;

        // Step 2: Fetch report using scan ID
        const reportResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
            method: "GET",
            headers: { "x-apikey": VIRUSTOTAL_API_KEY }
        });

        const reportData = await reportResponse.json();
        const stats = reportData.data.attributes.stats;

        // Step 3: Analyze malicious results
        const maliciousCount = stats.malicious || 0;
        const suspiciousCount = stats.suspicious || 0;

        console.log(`Malicious: ${maliciousCount}, Suspicious: ${suspiciousCount}`);
        console.log("VirusTotal Response:", reportData);

        if (maliciousCount > 3) {
            console.log("VirusTotal Response:", reportData);
            return "🚨 Phishing Detected!";
        } else if (maliciousCount > 0 || suspiciousCount > 1) {
            console.log("VirusTotal Response:", reportData);
            return "⚠️ Suspicious Site";
        } else {
            console.log("VirusTotal Response:", reportData);
            return "✅ Safe";
        }
    } catch (error) {
        console.error("VirusTotal API Error:", error);
        return "Error fetching data";
    }
}