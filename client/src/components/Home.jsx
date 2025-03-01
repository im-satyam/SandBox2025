import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (!tkn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 w-full">
            {/* Introduction Section */}
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200">
                <h1 className="text-3xl font-extrabold mb-4 text-green-700">
                    Welcome to Caliber-Cops 🚀
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">
                    Your one-stop solution for cybersecurity checks! We offer:
                </p>
                <ul className="mt-4 space-y-2 text-gray-700 text-lg text-left">
                    <li>✅ Check if your email has been compromised.</li>
                    <li>✅ Verify if a password has been leaked & assess its strength.</li>
                    <li>✅ Detect malicious/phishing websites and emails.</li>
                </ul>
            </div>

            {/* Features Section */}
            <div className="mt-10 flex gap-6">
                {[
                    { to: "/mailbreach", text: "Mail" },
                    { to: "/passbreach", text: "Pass" },
                    { to: "/phishing", text: "Phishing" },
                ].map(({ to, text }) => (
                    <Link
                        key={to}
                        to={to}
                        className="relative px-6 py-3 text-green-700 font-bold uppercase border-2 border-green-700 transition-all duration-300 overflow-hidden hover:text-green-800 before:absolute before:inset-0 before:w-0 before:h-full before:-left-10 before:bg-green-700 before:skew-x-[-45deg] before:transition-all before:duration-300 before:z-[-1] hover:before:w-[160%] rounded-lg shadow-md"
                    >
                        {text}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
