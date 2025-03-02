import React, { useState, useEffect } from 'react';
import { handleCheck } from '../utils/handleCheck';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Password = () => {
    const [result, setResult] = useState({ res: false, pwned: false, message: '' });
    const [prevPassword, setPrevPassword] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = watch("password", "");

    useEffect(() => {
        if (password.length < prevPassword.length) {
            setResult({ res: false, pwned: false, message: '' });
        }
        setPrevPassword(password);
    }, [password]);

    const changeLoading = (state) => {
        setIsloading(state);
    };

    const checkPass = (data) => {
        handleCheck({
            endpoint: "pass",
            data,
            changeload: changeLoading,
            setResult,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mainContent w-full px-4 text-center overflow-hidden my-5"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold"
            >
                Password Breach Police!
            </motion.div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm text-gray-500"
            >
                Check whether your password has been compromised or not
            </motion.div>
            {/* Password Check Form */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="contentInput"
            >
                <form
                    action="POST"
                    onSubmit={handleSubmit(checkPass)}
                    className="flex flex-col gap-3 my-2"
                >
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full"
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password to check"
                            {...register("password", { required: "Password is required" })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all w-full"
                            name="password"
                        />
                        {/* Eye icon button with animation */}
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </motion.button>
                    </motion.div>

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
                        {result.pwned ? (
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

export default Password;
