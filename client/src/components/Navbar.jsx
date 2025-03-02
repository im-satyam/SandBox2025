import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldUser } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        setUserToken(localStorage.getItem("userToken"));
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-around items-center p-4 shadow-md bg-white"
        >
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    to={userToken ? "/home" : "/"}
                    className="cursor-pointer text-2xl font-bold text-black"
                >
                    Calibre-Cops
                </Link>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
                <AnimatePresence>
                    {!userToken ? (
                        <motion.div
                            key="auth-links"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="flex gap-5 text-green-800"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/login"
                                    className="px-2 py-0.5 border-2 bg-[#6cff33] rounded-full font-bold text-center"
                                >
                                    Login
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/register"
                                    className="px-2 py-0.5 border-2 bg-[#6cff33] rounded-full font-bold text-center"
                                >
                                    Sign Up
                                </Link>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="profile-link"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                to="/profile"
                                className="px-2 py-0.5 border-2 bg-[#6cff33] rounded-full flex gap-2 items-center text-green-800"
                            >
                                <h1 className="font-bold">Profile</h1>
                                <motion.div whileHover={{ scale: 1.2 }}>
                                    <ShieldUser />
                                </motion.div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
