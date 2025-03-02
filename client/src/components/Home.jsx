import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (!tkn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 w-full"
        >
            {/* Introduction Section */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200"
            >
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-3xl font-extrabold mb-4 text-green-700"
                >
                    Welcome to Caliber-Cops 🚀
                </motion.h1>

                <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg leading-relaxed text-gray-600"
                >
                    Your one-stop solution for cybersecurity checks! We offer:
                </motion.p>

                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-4 space-y-2 text-gray-700 text-lg text-left"
                >
                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>✅ Check if your email has been compromised.</motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>✅ Verify if a password has been leaked & assess its strength.</motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>✅ Detect malicious/phishing websites and emails.</motion.li>
                </motion.ul>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10 flex gap-6"
            >
                {[
                    { to: "/mailbreach", text: "Mail" },
                    { to: "/passbreach", text: "Pass" },
                    { to: "/phishing", text: "Phishing" },
                ].map(({ to, text }) => (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={to}>
                        <Link
                            to={to}
                            className="relative px-6 py-3 text-green-700 font-bold uppercase border-2 border-green-700 transition-all duration-300 overflow-hidden rounded-lg shadow-md"
                        >
                            {text}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Home;
