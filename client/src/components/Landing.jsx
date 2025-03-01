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
                <div className='flex flex-col flex-1'>
                    Website
                </div>
                <div className='flex flex-col flex-1'>
                    Features
                </div>
                <div className="flex flex-col flex-1">
                    Login Register
                    <Link to="/login" className='cursor-pointer font-semibold text-md text-sky-600'>Login to Existing Account</Link>
                    <Link to="/register" className='cursor-pointer font-semibold text-md text-sky-600'>Register a New Account</Link>

                </div>
                <div className='flex flex-col flex-1'>
                    Contact
                </div>
            </div>
        </>
    )
}

export default Landing