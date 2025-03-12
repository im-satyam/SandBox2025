import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("Name");
    const [mail, setMail] = useState("user@gmail.com");
    const [user, setUser] = useState("username");

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get("http://localhost:8080/v1/current-user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setName(response.data.user.name);
            setMail(response.data.user.email);
            setUser(response.data.user.username);
        } catch (error) {
            console.error("Login error: ", error.response?.data || error.message);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        navigate('/');
    };

    return (
        <>
            <div className='flex flex-col w-screen items-center pt-5 justify-center'>

                {/* Animated Profile Container */}
                <motion.div
                    className="p-6 flex justify-center items-center gap-15 w-fit scale-[1.5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* User Info */}
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                        <p className="text-sm text-gray-600">Email : {mail}</p>
                    </motion.div>

                    {/* Animated Circle & User Icon */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <motion.svg
                            className="absolute w-full h-full"
                            viewBox="0 0 36 36"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        >
                            <circle cx="18" cy="18" r="15" stroke="green" strokeWidth="5" fill="none"></circle>
                        </motion.svg>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                        >
                            <User className="w-6 h-6" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Animated Sign-Out Button */}
                <motion.div
                    className='flex flex-col justify-center items-center py-5'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                >
                    <motion.button
                        onClick={handleSignOut}
                        className='w-full bg-green-600 text-white rounded-4xl font-bold hover:cursor-pointer transition-all scale-95 hover:scale-[1]'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign Out
                    </motion.button>
                    <div className='text-sm font-semibold text-gray-500'>Sign out of your account</div>
                </motion.div>

            </div>
        </>
    );
};

export default Profile;
