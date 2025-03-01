import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldUser } from 'lucide-react'

const Navbar = () => {
    const [userToken, setuserToken] = useState("")
    useEffect(() => {
        setuserToken(localStorage.getItem("userToken"));
    }, [])


    return (
        <nav className="flex justify-around items-center p-4 shadow-green-950">
            <Link to={userToken ? "/home" : "/"} className='cursor-pointer text-2xl font-bold text-[#6cff33]]'>Calibre-Cops</Link>
            <div className="flex space-x-6">
                {!userToken ?
                    <div className='flex gap-5 text-green-800'>
                        <Link to={"/login"} className="px-2 py-0.5 border-2 bg-[#6cff33] rounded-full font-bold hover:cursor-pointer text-center">
                            Login
                        </Link >
                        <Link to={"/register"} className="px-2 py-0.5 border-2 bg-[#6cff33] rounded-full font-bold hover:cursor-pointer text-center">
                            Sign Up
                        </Link >
                    </div> :
                    <Link to={"/profile"} className={`{ tkn ? "": "border-2 bg-[#6cff33] rounded-full " } px-2 py-0.5 hover:cursor-pointer text-center flex gap-2 text-green-800`}><h1 className='font-bold'>Profile</h1> <ShieldUser /></Link>
                }
            </div>
        </nav >

    )
}

export default Navbar
