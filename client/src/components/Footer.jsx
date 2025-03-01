import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-evenly bg-black text-[#6cff33] py-6'>
            <div>
                <h2>
                    HACK2A
                </h2>
                <p>We are Team HACK2A. We try to build easy solutions for complex problems.</p>
            </div>
            <div>
                <h2>
                    Team Members
                </h2>
                <ul>
                    <li>Aditya Pratap Singh</li>
                    <li>Akshat Pratyush</li>
                    <li>Satyam Kumar</li>
                </ul>
            </div>
            <div>
                <h2>
                    Contact Us {/*href to write us page*/}
                </h2>
                <p>contact.hack2a@gmail.com</p>
            </div>
        </div>
    )
}

export default Footer