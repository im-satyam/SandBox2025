import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("Name");
    const [mail, setMail] = useState("user@gmail.com");

    useEffect(() => {
        fetchUserData();
    }, [])


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get("http://localhost:8080/user/current-user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
            setName(response.data.user.name);
            setMail(response.data.user.email);
        } catch (error) {
            console.error("Login error: ", error.response?.data || error.message);
        }
    }


    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        navigate('/login')
    }

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-white'>
                <div className="container flex flex-col gap-5 w-md min-h-4/5 relative p-5 rounded-4xl border-2 border-gray-200 backdrop-blur-xl shadow-xl">
                    <div className='flex flex-col gap-1 items-center'>
                        <div className='text-2xl font-bold'>Welcome Back User!</div>
                        <div className='text-sm font-semibold text-gray-500'>Here are your registered details:</div>
                    </div>
                    <hr className='border-gray-300'></hr>
                    <div className='flex flex-col gap-1'>
                        <div>
                            Name : {name}
                        </div>
                        <div>
                            Email : {mail}
                        </div>
                    </div>
                    <hr className='border-gray-300'></hr>
                    <motion.div className='flex flex-col justify-center items-center'
                        initial={{ rotate: 180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }} >
                        <button onClick={handleSignOut} className='w-full bg-sky-600 text-white rounded-4xl font-bold hover:cursor-pointer transition-all scale-95 hover:scale-[1]'>Sign Out</button>
                        <div className='text-sm font-semibold text-gray-500'>Sign out of your acoount</div>

                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default User
