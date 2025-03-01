import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { handleCheck } from "./handleCheck";


const Popup = () => {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("Checking...");
    const [result, setResult] = useState({ res: false, pwned: '', message: '' })
    const [prevEmail, setPrevEmail] = useState("");
    const [isloading, setIsloading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const emailInput = watch("email", "");

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

    useEffect(() => {
        if (emailInput.length < prevEmail.length) {
            setResult({ res: false, pwned: false, message: '' });
        }
        setPrevEmail(emailInput);
    }, [emailInput]);

    const changeLoading = (state) => {
        setIsloading(state)
    }

    const checkEmail = (data) => {
        handleCheck({
            endpoint: "email",
            data,
            changeload: changeLoading,
            setResult
        });
    }

    return (
        <div className="w-72 h-105 bg-white rounded-lg shadow-sm p-4">
            <div className="text-lg font-semibold text-gray-800">
                Calibre-Cops
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="text-gray-700">
                <h2 className="text-xl font-medium mb-2">Phishing Check</h2>
                <p><b>URL:</b> {url}</p>
                <p><b>Status:</b> {status}</p>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="contentInput">
                <form
                    action="POST"
                    onSubmit={handleSubmit(checkEmail)}
                    className="flex flex-col gap-3 my-2"
                >
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Email to check"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            name="email"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 ${isloading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                } text-white rounded-lg text-sm font-medium transition-all shadow-sm`}
                            disabled={isloading}
                        >
                            Check
                        </button>
                    </div>
                </form>
            </div>
            <div className="contentResult flex flex-col items-center text-center my-3">
                {result.res ? (
                    <>
                        {result.pwned ? (
                            <div className="text-red-600 font-semibold text-lg dark:text-red-500">⚠ Caution! Email found in breaches.</div>
                        ) : (
                            <div className="text-green-600 font-semibold text-lg dark:text-green-500">✔ Secure! No breaches found.</div>
                        )}
                        <div className="text-gray-600 text-xs mt-1 dark:text-gray-200">{result.message}</div>
                    </>
                ) : (
                    ""
                )}
            </div>

        </div>
    );
};

export default Popup;
