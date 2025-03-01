import React, { useState, useEffect } from "react";

const Popup = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("Checking...");

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
                setUrl(tabs[0].url);
                console.log("Sending request to background:", tabs[0].url);

                chrome.runtime.sendMessage(
                    { action: "checkPhishing", url: tabs[0].url },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.error("Error sending message:", chrome.runtime.lastError);
                            setStatus("⚠️ Background script error");
                        } else if (response?.status) {
                            setStatus(response.status);
                        } else {
                            setStatus("⚠️ No response received");
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <div>
            <h2>Phishing Check</h2>
            <p><b>URL:</b> {url}</p>
            <p><b>Status:</b> {status}</p>
        </div>
    );
};

export default Popup;
