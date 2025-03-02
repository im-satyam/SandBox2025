import React, { useState, useEffect } from 'react';
import { handleCheck } from '../utils/handleCheck';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from "framer-motion";

const Phishing = () => {
    const [result, setResult] = useState({ res: false, malicious: false, message: '' });
    const [phishmode, setPhishmode] = useState("site");
    const [isloading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const inputValue = watch(phishmode === "site" ? "url" : "mailcon", "");

    useEffect(() => {
        if (inputValue.trim() === "") {
            setResult({ res: false, malicious: false, message: '' });
        }
    }, [inputValue]);

    const handleModeChange = (mode) => {
        setPhishmode(mode);
        setResult({ res: false, malicious: false, message: '' });
    };

    const changeLoading = (state) => {
        setIsloading(state);
    };

    const checkPhish = (data) => {
        handleCheck({
            endpoint: "phishing",
            data,
            changeload: changeLoading,
            setResult,
            phishmode,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mainContent w-full px-4 overflow-hidden"
        >
            {/* Mode Selection Buttons */}
            <div className="flex justify-center gap-4 mb-4">
                {["site", "mail"].map((mode) => (
                    <motion.button
                        key={mode}
                        onClick={() => handleModeChange(mode)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2 text-sm font-medium z-10 hover:cursor-pointer transition-all rounded-lg shadow-md 
                        ${phishmode === mode ? "bg-green-700 text-white font-bold" : "bg-gray-300 text-gray-700"}`}
                    >
                        {mode === "site" ? "Website" : "Mail"}
                    </motion.button>
                ))}
            </div>

            {/* Input Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="contentInput"
            >
                <form onSubmit={handleSubmit(checkPhish)} className="flex flex-col gap-3 my-2">
                    <motion.div
                        key={phishmode}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-2"
                    >
                        {phishmode === "site" ? (
                            <input
                                type="url"
                                placeholder="Website to check"
                                {...register("url", { required: "URL is required" })}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
                                name="url"
                            />
                        ) : (
                            <textarea
                                placeholder="Mail Content to check"
                                {...register("mailcon", { required: "Content is required" })}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full h-20"
                                name="mailcon"
                            />
                        )}
                    </motion.div>
                    {errors[phishmode === "site" ? "url" : "mailcon"] && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-red-500 text-xs"
                        >
                            {errors[phishmode === "site" ? "url" : "mailcon"].message}
                        </motion.div>
                    )}

                    {/* Submit Button with Loading Animation */}
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 ${isloading ? "bg-blue-200 hover:cursor-not-allowed" : "bg-green-500 hover:bg-green-600 hover:cursor-pointer"} text-white rounded-lg text-sm font-medium transition-all shadow-md flex items-center gap-2`}
                            disabled={isloading}
                        >
                            {isloading ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                "Check"
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            {/* Result Section with Smooth Animation */}
            <AnimatePresence>
                {result.res && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="contentResult flex flex-col items-center text-center my-3 scale-[1.2]"
                    >
                        {result.malicious ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-red-600 font-semibold text-lg dark:text-red-500"
                            >
                                ⚠ Caution!
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-green-600 font-semibold text-lg dark:text-green-500"
                            >
                                ✔ Secure!
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-600 text-xs mt-1"
                        >
                            {result.message}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Phishing;
