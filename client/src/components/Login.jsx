import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
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
            localStorage.setItem('userToken', curToken)
            navigate('/home', { replace: true })
        } catch (error) {
            console.error("Login error: ", error.response?.data || error.message);
        }
    }

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-white'>
                <div className="container flex flex-col gap-5 w-md min-h-4/5 relative p-5 rounded-4xl border-2 border-gray-200 backdrop-blur-xl shadow-xl">
                    <div className='flex flex-col gap-1'>
                        <div className='text-2xl font-bold'>Welcome Back User!</div>
                        <div className='text-sm font-semibold text-gray-500'>Enter your registered details:</div>
                    </div>
                    <hr className='border-gray-300'></hr>
                    <div className=''>
                        <form action="POST" onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="email">Enter Your Email:</label>

                                <input
                                    type="email"
                                    placeholder='Registered Email'
                                    {...register("email", { required: "Email is required" })}
                                    className='border-2 border-gray-200 rounded-md px-1 py-0.5'
                                    name='email' />

                                {errors.email && <div className="text-red-600 text-xs">{errors.email.message}</div>}

                                <label htmlFor="password">Enter Your Password:</label>

                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Registered Password"
                                        {...register("password", { minLength: { value: 6, message: "Min length of password is 6" } })}
                                        className="border-2 border-gray-200 rounded-md px-3 py-2 w-full pr-10" // Add padding-right for icon space
                                        name="password"
                                    />
                                    {errors.password && <div className='text-red-600 text-xs'>{errors.password.message}</div>}
                                    {/* Eye icon button */}
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                            </div>
                            <hr className='border-gray-300'></hr>
                            <div>
                                <button type='submit' className='w-full bg-sky-600 text-white rounded-4xl font-bold hover:cursor-pointer transition-all scale-95 hover:scale-[1]'>Login</button>
                            </div>
                        </form>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='w-3/5 h-[1.5px] bg-gray-200 my-5'></div>
                            <div className='text-gray-500'>or</div>
                            <div className='w-3/5 h-[1.5px] bg-gray-200 my-5'></div>
                        </div>
                        <div className='altRoute flex flex-col justify-center items-center'>
                            <span className=''>Don't have an account?</span>
                            <span className='text-sky-600'>
                                <Link to="/register" className='cursor-pointer font-semibold text-md'>Register!</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login