import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (tkn) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <>
            <div className="flex flex-col">
                <div className='flex flex-col flex-1 text-center mt-4'>
                    <h2>
                        ABOUT WEBSITE
                    </h2>
                    <p className='mx-6 mt-4'>Welcome to [Platform Name], your trusted security companion. Our platform helps you stay safe online by providing tools to check whether an email or URL is a scam. Additionally, we monitor your email and password to see if they have been compromised in any data breach. If a breach is detected, we will immediately notify you so you can take swift action to protect your personal information. Stay informed and secure with [Platform Name], and browse the internet with peace of mind.</p>
                </div>
                <div className='flex flex-col flex-1 text-center'>
                    <h2>
                        FEATURES
                    </h2>
                    <div className='flex justify-around mx-6 mt-auto'>
                        <div>
                            <div>
                                feature 1
                            </div>
                            <div>
                                feature 2
                            </div>
                            <div>
                                feature 3
                            </div>
                        </div>
                        <div>
                            About Feature
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 text-center mt-4">
                    <h2>
                        Login Register
                    </h2>
                    <div className='flex justify-around'>
                        <Link to="/login" className='cursor-pointer font-semibold text-md text-sky-600'>Login to Existing Account</Link>
                        <Link to="/register" className='cursor-pointer font-semibold text-md text-sky-600'>Register a New Account</Link>
                    </div>
                </div>
                <div className='flex flex-col flex-1 text-center mt-4'>
                    <h2>
                        Contact
                    </h2>
                </div>
            </div>
        </>
    )
}

export default Landing