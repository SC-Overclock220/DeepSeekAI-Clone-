import React from 'react'
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import UserLogo from '../assets/user.png'
import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_BASE_URL;
const Sidebar = () => {


    const handleLogout = async (e) => {

        e.preventDefault();

        try {


            const { data } = await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });

            if (data.success)
                return toast.success(data.message);


            return toast.error(data.message);

        } catch (error) {

            console.log(error);
            return toast.error(error.response.data.message); i

        }



    }
    return (
        <div className='h-full flex flex-col bg-sidebar-dark '>


            {/* Header */}


            <div className='p-4 border-b border-gray-700 flex items-center justify-between'>


                <div className='text-xl font-bold text-wide'>Clone AI</div>

                <div className='text-gray-300 '><IoClose className='h-6 w-6' /></div>
            </div>




            {/* History */}

            <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'>

                <button className='w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mb-4'>New Chat</button>

                <div className='text-gray-500 text-sm mt-20 text-center'>No Chat History Yet</div>
            </div>




            {/* Footer */}

            <div className='p-4 border-t border-gray-700 '>


                <div className='flex flex-col gap-3'>

                    <div className='flex items-center gap-2 cursor-pointer'>

                        <img className='rounded-full w-8 h-8' src={UserLogo} alt='User Logo' />
                        <span className='text-gray-300 '>My Profile</span>
                    </div>

                    <div className='flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-200 transition' onClick={handleLogout}>

                        <IoLogOutOutline className='h-6 w-6' />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar