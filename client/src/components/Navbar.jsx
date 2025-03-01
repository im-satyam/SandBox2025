import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let tkn = localStorage.getItem("userToken");



    return (
        <nav className="flex justify-between items-center bg-black text-[#6cff33] p-4 shadow-md">
            <Link to={tkn ? "/home" : "/"} className='cursor-pointer text-xl font-bold text-[#6cff33]]'>Hack2A</Link>
            <div className="flex space-x-6">
                <ul className="flex space-x-6">
                    <li className="hover:text-gray-400 cursor-pointer">About</li>
                    <li className="hover:text-gray-400 cursor-pointer">Contact</li>
                    <li className="hover:text-gray-400 cursor-pointer">Socials</li>
                </ul>
                <button className="p-2.5 border-2 border-[#6cff33] rounded-full">
                    Login
                </button>
                <button className="p-2.5 border-2 border-[#6cff33] rounded-full">
                    Sign Up
                </button>
            </div>
        </nav >

    )
}

export default Navbar
