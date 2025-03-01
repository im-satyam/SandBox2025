import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleCheck } from "./handleCheck";

const Popup = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("Checking...");
    const [result, setResult] = useState({ res: false, pwned: "", message: "" });
    const [prevEmail, setPrevEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const emailInput = watch("email", "");

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
                setUrl(tabs[0].url);

                chrome.runtime.sendMessage({ action: "checkPhishing", url: tabs[0].url }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error sending message:", chrome.runtime.lastError);
                        setStatus("⚠️ Background script error");
                    } else if (response?.status) {
                        setStatus(response.status);
                    } else {
                        setStatus("⚠️ No response received");
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (emailInput.length < prevEmail.length) {
            setResult({ res: false, pwned: false, message: "" });
        }
        setPrevEmail(emailInput);
    }, [emailInput]);

    const changeLoading = (state) => setIsLoading(state);

    const checkEmail = (data) => {
        handleCheck({
            endpoint: "email",
            data,
            changeload: changeLoading,
            setResult,
        });
    };

    return (
        <div className="w-80 h-auto bg-white rounded-lg shadow-md p-5 border border-gray-200">
            {/* Header */}
            <div className="text-center text-green-700 font-bold text-lg">
                🌿 Calibre-Cops
            </div>
            <hr className="my-3 border-gray-300" />

            {/* Phishing Check Section */}
            <div className="text-gray-800">
                <h2 className="text-lg font-semibold mb-1">Phishing Check</h2>
                <p className="text-sm"><b>URL:</b> {url}</p>
                <p className="text-sm font-medium"><b>Status:</b> <span className="text-green-600">{status}</span></p>
            </div>

            <hr className="my-3 border-gray-300" />

            {/* Email Breach Check */}
            <div className="text-gray-800">
                <h2 className="text-lg font-semibold mb-2">Email Breach Check</h2>
                <form onSubmit={handleSubmit(checkEmail)} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white rounded-md text-sm font-medium transition-all shadow-md ${isLoading
                            ? "bg-green-300 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 cursor-pointer"
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Checking..." : "Check Email"}
                    </button>
                </form>
            </div>

            {/* Result Section */}
            {result.res && (
                <div className="contentResult flex flex-col items-center text-center my-3">
                    {result.pwned ? (
                        <div className="text-red-600 font-semibold text-lg">⚠ Caution! Email found in breaches.</div>
                    ) : (
                        <div className="text-green-600 font-semibold text-lg">✔ Secure! No breaches found.</div>
                    )}
                    <p className="text-gray-600 text-xs mt-1">{result.message}</p>
                </div>
            )}
        </div>
    );
};

export default Popup;
