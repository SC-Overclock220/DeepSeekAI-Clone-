import React from 'react'
import { IoClose, IoLogOutOutline } from "react-icons/io5";
const Sidebar = () => {
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

                        <img className='rounded-full w-8 h-8' src='' alt='' />
                        <span className='text-gray-300 '>My Profile</span>
                    </div>

                    <div className='flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-200 transition'>

                        <IoLogOutOutline className='h-6 w-6' />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar