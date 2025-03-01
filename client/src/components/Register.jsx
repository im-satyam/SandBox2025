import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';


const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        const response = await axios.post("http://localhost:8080/v1/register", data)
        console.log(response.data);
        let curToken = response.data.token;
        console.log(curToken);
        localStorage.setItem('userToken', curToken)
        navigate('/home', { replace: true })
    }

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-white'>
                <div className="container flex flex-col gap-5 w-md min-h-4/5 relative p-5 rounded-4xl border-2 border-gray-200 backdrop-blur-xl shadow-xl">
                    <div className='flex flex-col gap-1'>
                        <div className='text-2xl font-bold'>Welcome, New User!</div>
                        <div className='text-sm font-semibold text-gray-500'>Fill the details and join the family!</div>
                    </div>
                    <hr className='border-gray-300'></hr>
                    <div className=''>
                        <form action="POST" onSubmit={handleSubmit(handleRegister)} className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="name">Enter Your Full Name:</label>
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    {...register("name", { required: "Full Name is required" })}
                                    className='border-2 border-gray-200 rounded-md px-1 py-0.5'
                                    name='name' />

                                {errors.name && <div className="text-red-600 text-xs">{errors.name.message}</div>}

                                <label htmlFor="username">Enter Your Username:</label>
                                <input
                                    type="text"
                                    placeholder='Username'
                                    {...register("username", { required: "Username is required" })}
                                    className='border-2 border-gray-200 rounded-md px-1 py-0.5'
                                    name='username' />

                                {errors.name && <div className="text-red-600 text-xs">{errors.name.message}</div>}

                                <label htmlFor="email">Enter Your Email:</label>

                                <input
                                    type="email"
                                    placeholder='Email'
                                    {...register("email", { required: "Email is required" })}
                                    className='border-2 border-gray-200 rounded-md px-1 py-0.5'
                                    name='email' />

                                {errors.email && <div className="text-red-600 text-xs">{errors.email.message}</div>}

                                <label htmlFor="password">Enter Your Password:</label>

                                <div className='relative w-full'>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder='Set Password'
                                        {...register("password", { minLength: { value: 6, message: "Min length of password is 6" } })} className='border-2 border-gray-200 rounded-md px-1 py-0.5 w-full'
                                        name='password' />


                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                                {errors.password && <div className='text-red-600 text-xs'>{errors.password.message}</div>}
                            </div>
                            <hr className='border-gray-300'></hr>
                            <div>
                                <button type='submit' className='w-full bg-sky-600 text-white rounded-4xl font-bold hover:cursor-pointer transition-all scale-95 hover:scale-[1]'>Register</button>
                            </div>
                        </form>
                        <div className='flex justify-center items-center gap-2'>
                            <div className='w-3/5 h-[1.5px] bg-gray-200 my-5'></div>
                            <div className='text-gray-500'>or</div>
                            <div className='w-3/5 h-[1.5px] bg-gray-200 my-5'></div>
                        </div>
                        <div className='altRoute flex flex-col justify-center items-center'>
                            <span className=''>Already an existing user?</span>
                            <span className='text-sky-600'>
                                <Link to="/login" className='cursor-pointer font-semibold text-md'>Sign in!</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register