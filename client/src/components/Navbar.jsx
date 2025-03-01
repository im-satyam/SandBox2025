import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
            <div className="text-xl font-bold">YourSite</div>
            <div>
                <ul className="flex space-x-6">
                    <li className="hover:text-gray-400 cursor-pointer">About</li>
                    <li className="hover:text-gray-400 cursor-pointer">Contact</li>
                    <li className="hover:text-gray-400 cursor-pointer">Socials</li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
