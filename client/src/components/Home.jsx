import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const [isloading, setisLoading] = useState(false)

    const changeLoading = (state) => {
        setisLoading(state)
    }
    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (!tkn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <div>
                <Link to="/profile" className='cursor-pointer font-semibold text-md text-sky-600'>Profile</Link>
            </div>
            <div className='flex flex-col'>
                <Link to="/mailbreach" className='cursor-pointer font-semibold text-md text-sky-600'>Mail</Link>
                <Link to="/passbreach" className='cursor-pointer font-semibold text-md text-sky-600'>Pass</Link>
                <Link to="/phishing" className='cursor-pointer font-semibold text-md text-sky-600'>Phishing</Link>
            </div>
        </div>
    )
}

export default Home