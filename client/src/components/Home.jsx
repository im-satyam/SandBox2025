import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (!tkn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <Link to="/profile" className='cursor-pointer font-semibold text-md text-sky-600'>Profile</Link>
        </div>
    )
}

export default Home