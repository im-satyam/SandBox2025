import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="bg-black text-[#6cff33] py-8 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Logo & About Section */}
            <motion.div
                className="text-center md:text-left mb-6 md:mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold tracking-wide">HACK2A</h2>
                <p className="text-sm text-gray-400 mt-2 max-w-xs">
                    We are Team HACK2A. We try to build easy solutions for complex problems.
                </p>
            </motion.div>

            {/* Team Members */}
            <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h2 className="text-xl font-semibold">Team Members</h2>
                <ul className="mt-2 text-sm">
                    {["Aditya Pratap Singh", "Akshat Pratyush", "Satyam Kumar"].map((member, index) => (
                        <motion.li
                            key={index}
                            className="hover:text-white transition duration-300 cursor-pointer"
                            whileHover={{ scale: 1.1, x: 5 }}
                        >
                            {member}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div
                className="text-center md:text-left mt-6 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <motion.p
                    className="text-sm mt-2 hover:text-white transition duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    contact.hack2a@gmail.com
                </motion.p>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
