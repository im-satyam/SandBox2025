import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const tkn = localStorage.getItem('userToken');
        if (tkn) {
            navigate('/home');
        }
    }, [navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/v1/login", data);
            let curToken = response.data.token;
            localStorage.setItem('userToken', curToken);
            navigate('/home', { replace: true });
        } catch (error) {
            console.error("Login error: ", error.response?.data || error.message);
            setIsError(true);
            setError("Invalid Credentials!");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center min-h-screen"
        >
            {/* Login Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-1/2 max-w-lg h-screen bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center"
            >
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold text-gray-800 text-center"
                >
                    Welcome Back User!
                </motion.h2>

                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm font-semibold text-gray-500 text-center"
                >
                    Enter your registered details:
                </motion.p>

                <hr className="border-gray-300 my-4" />

                {/* Login Form */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <label htmlFor="email" className="block font-medium">Enter Your Email:</label>
                        <input
                            type="email"
                            placeholder="Registered Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-700"
                            name="email"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                    </motion.div>

                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <label htmlFor="password" className="block font-medium">Enter Your Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Registered Password"
                                {...register("password", { minLength: { value: 6, message: "Min length of password is 6" } })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-green-700 pr-10"
                                name="password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                    </motion.div>

                    {/* Shake animation for error */}
                    <AnimatePresence>
                        {isError && (
                            <motion.p
                                key="error"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: [0, -5, 5, -5, 5, 0], opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-red-600 text-xs text-center"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                        type="submit"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="flex justify-center items-center gap-2 my-5">
                    <div className="w-2/5 h-[1px] bg-gray-300"></div>
                    <span className="text-gray-500">or</span>
                    <div className="w-2/5 h-[1px] bg-gray-300"></div>
                </div>

                {/* Register Link */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-green-700 font-semibold hover:underline">
                            Register!
                        </Link>
                    </p>
                </motion.div>
            </motion.div>

            {/* Background Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className='flex flex-1 h-screen'
            >
                <img
                    src="https://media.istockphoto.com/id/1307188897/video/abstract-background.jpg?s=640x640&k=20&c=HWuCUKzzrfR77rQBUudirMjWBHwm_4XzSuWR9elhBJ4="
                    alt="bg"
                    className="w-full h-full object-cover object-center block"
                />
            </motion.div>
        </motion.div>
    );
};

export default Login;
