
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { AppContext } from '../Context/App.Context';

const baseURL = import.meta.env.VITE_BASE_URL;
const Login = () => {

    const contextData = useContext(AppContext);
    const { user, getUserData, setUserData } = contextData;

    const navigate = useNavigate();


    const inputClasses = 'w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#db251e]';

    const [formData, setFormData] = useState({

        email: "", username: "", password: ""
    });
    const [signUpError, setSignUpError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);


    const handleInputChange = (e) => {


        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        setSignUpError('');

        console.log(formData);

        const { email, password, username } = formData;

        if (!email || !password || !username) {


            setSignUpError(`None Of The Required Fields Can Be Empty`);
            return toast.error(`None Of The Required Fields Can Be Empty`);


        }


        try {

            console.log(`${baseURL}/auth/login`);

            const { data } = await axios.post(`${baseURL}/auth/login`, formData, { withCredentials: true });

            console.log(data);

            if (data.success) {
                getUserData();
                navigate('/');
                return toast.success(data.message);

            }


            return toast.error(data.message);

        } catch (error) {


            console.log(error);
            return toast.error(error.response.data.message);

        }


    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-black px-4'>


            <form className='bg-app-dark text-white w-fill max-w-md rounded-2xl p-6 shadow-lg' onSubmit={handleSubmit}>

                {/* Heading */}

                <h1 className='text-center text-3xl mb-8'>Login</h1>

                {/* Email */}
                <div className='my-3'>

                    <label htmlFor='email'>Email</label>

                    <input className={inputClasses} type='email' name='email' placeholder='Enter Email' id='email' value={formData.email} onChange={handleInputChange} />

                </div>

                {/* Username */}
                <div className='my-3'>
                    <label htmlFor='username'>Username</label>

                    <input className={inputClasses} type='text' name='username' placeholder='Enter Username' id='username' value={formData.username} onChange={handleInputChange} />

                </div>
                {/* Password */}
                <div className='my-3'>
                    <label htmlFor='password'>Password</label>

                    <div className='relative'>

                        <input className={inputClasses} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter Password' id='password' value={formData.password} onChange={handleInputChange} />
                        {!showPassword ? <IoEyeSharp size={18} className='right-3 top-3 text-gray-400 absolute cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> : <IoEyeOffSharp size={18} className='right-3 top-3 text-gray-400 absolute cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}

                    </div>

                </div>



                {/* Error */}

                <div className={`${signUpError ? 'block' : 'hidden'} text-red-600 text-sm`}>{signUpError}</div>


                <button type='submit' className='w-full bg-red-600 text-white font-semibold py-2 rounded-lg transition hover:bg-red-700'>Login</button>

                {/* links */}

                <div className='text-center my-3'>

                    Dont Have An Account?  <Link className='text-red-600 underline' to="/signup">Sign Up </Link>
                </div>




            </form >
        </div >
    )
}

export default Login