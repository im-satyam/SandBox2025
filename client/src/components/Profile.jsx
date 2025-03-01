import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("Name");
    const [mail, setMail] = useState("user@gmail.com");
    const [user, setUser] = useState("username");

    useEffect(() => {
        fetchUserData();
    }, [])


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
    }


    const handleSignOut = () => {
        localStorage.removeItem('userToken');
        navigate('/login')
    }

    return (
        <>
            <div className='flex flex-col w-screen items-center pt-5'>
                <div className="p-6 flex justify-center items-center gap-15 w-fit">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-gray-900">
                            Full Name : {name}
                        </h2>
                        <h3 className="text-md text-gray-700">
                            @username : {user}
                        </h3>
                        <p className="text-sm text-gray-600">
                            Email : {mail}
                        </p>
                    </div>
                    <div className="relative w-24 h-24 ml-auto">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15" stroke="green" strokeWidth="5" fill="none"></circle>
                        </svg>
                    </div>
                </div>

                <div className="details">

                </div>
            </div>

        </>
    )
}

export default User
