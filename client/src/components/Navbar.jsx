import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-black text-[#6cff33] p-4 shadow-md">
            <div className="text-xl font-bold">YourSite</div>
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
        </nav>

    )
}

export default Navbar
