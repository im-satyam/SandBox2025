import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Landing = () => {
    const [mode, setMode] = useState("email");
    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (tkn) {
            navigate('/home');
        }
    }, [navigate]);

    const handleModeChange = (mode) => {
        setMode(mode);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen items-center"
        >
            {/* Header Section */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-52 flex items-center justify-center text-white font-bold text-lg bg-[url('https://media.istockphoto.com/id/865457032/vector/abstract-futuristic-cyberspace-with-binary-code-matrix-background-with-digits-well-organized.jpg?s=612x612&w=0&k=20&c=IQcdedY8fn_DMq6nwc5MaHUBe0H0d5DPyibHR8J2usk=')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60 before:bg-gradient-to-b before:from-black/50 before:via-transparent before:to-black/50"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className='text-white z-1 text-4xl font-bold'
                >
                    Your One Stop Cyber Suite!
                </motion.div>
            </motion.div>

            {/* Description Section */}
            <div className='flex flex-col text-center mt-4 p-6'>
                <p className='mx-6 mt-4'>
                    Welcome to <span className="font-semibold">Calibre-Cops</span>, your trusted security companion.
                    Our platform helps you stay safe online by providing tools to check whether an email or URL is a scam.
                    Additionally, we monitor your email and password to see if they have been compromised in any data breach.
                    If a breach is detected, we will immediately notify you so you can take swift action to protect your personal information.
                    Stay informed and secure with <span className="font-semibold">Calibre-Cops</span>, and browse the internet with peace of mind.
                </p>
            </div>

            {/* Buttons Section */}
            <div className='flex justify-around w-[80%] px-10 my-5 h-20'>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to="/login" className="relative w-fit max-w-[460px] bg-[#62e73d] text-black font-bold text-base md:text-xl px-6 md:px-12 py-3 md:py-3.5 flex justify-center items-center rotate-[-2deg] border-0 cursor-pointer select-none transition-all duration-200 outline-none after:content-[''] after:absolute after:border after:border-black after:w-[calc(100%-1px)] after:h-[calc(100%-1px)] after:bottom-1 after:left-1 hover:after:bottom-0.5 hover:after:left-0.5">
                        Login to Existing Account
                    </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to="/register" className="relative w-fit max-w-[460px] bg-[#62e73d] text-black font-bold text-base md:text-xl px-6 md:px-12 py-3 md:py-3.5 flex justify-center items-center rotate-[-2deg] border-0 cursor-pointer select-none transition-all duration-200 outline-none after:content-[''] after:absolute after:border after:border-black after:w-[calc(100%-1px)] after:h-[calc(100%-1px)] after:bottom-1 after:left-1 hover:after:bottom-0.5 hover:after:left-0.5">
                        Register a New Account
                    </Link>
                </motion.div>
            </div>

            {/* Mode Selector */}
            <div className="flex bg-gray-200 rounded-full p-1 w-1/2 dark:bg-green-700 scale-[1.3] mt-5 gap-5 relative">
                <motion.div
                    className="absolute bg-white rounded-full shadow-md w-1/3 h-7 dark:bg-green-800 dark:shadow-green-700 dark:shadow-xs mb-5"
                    initial={{ x: -3, y: -4 }}
                    animate={{ x: mode === "email" ? -3 : mode === "password" ? 250 : 503 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                <button
                    onClick={() => handleModeChange("email")}
                    className={`relative w-1/2 text-sm font-medium z-10 transition-all duration-300 ${mode === "email" ? "text-white font-bold scale-110" : "text-gray-400 scale-100 hover:scale-105"}`}
                >
                    Email
                </button>

                <button
                    onClick={() => handleModeChange("password")}
                    className={`relative w-1/2 text-sm font-medium z-10 transition-all duration-300 ${mode === "password" ? "text-white font-bold scale-110" : "text-gray-400 scale-100 hover:scale-105"}`}
                >
                    Password
                </button>

                <button
                    onClick={() => handleModeChange("phishing")}
                    className={`relative w-1/2 text-sm font-medium z-10 transition-all duration-300 ${mode === "phishing" ? "text-white font-bold scale-110" : "text-gray-400 scale-100 hover:scale-105"}`}
                >
                    Phishing
                </button>
            </div>

            {/* Animated Mode Text Section */}
            <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className='rounded-full p-1 w-1/2 border-2 border-green-700 my-5 h-32 text-center flex justify-center items-center'
            >
                {mode === "email"
                    ? "The website allows users to check if their email id has been compromised or not. It checks whether the email id has been breached or not."
                    : mode === "password"
                        ? "The website allows users to check if their password has been compromised or not. If the password is breached, the users will be notified."
                        : "The website allows the users to check if the given URL is a phishing URL or not. If the website is a scam, the user will be informed."
                }
            </motion.div>
        </motion.div>
    );
};

export default Landing;
