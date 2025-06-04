import React, { useState } from 'react'
import CloneAILogo from '../assets/CloneAILogo.png'

import { IoPulseOutline, IoPaperPlane } from "react-icons/io5";
const PromptArea = () => {

    const [inputVal, setInputVal] = useState("");
    const [lastMessage, setLastMessage] = useState("")

    const handleSend = () => {


        const trimmedData = inputVal.trim();

        if (!trimmedData)
            return;

        setLastMessage(trimmedData);
        setInputVal("");



    }

    const handleKeyDown = (e) => {

        if (e.key === 'Enter')
            handleSend();



    }
    return (
        <div className='flex flex-col items-center justify-between flex-1 w-full px-4 pb-4'>



            {/* Greeting */}

            <div className='mt-16 text-center'>

                <div className='flex items-center justify-center gap-2 '>

                    <img src={CloneAILogo} alt='Clone AI Logo' className='h-10 w-10' />

                    <h1 className='text-3xl font-semibold text-white mb-2  my-2'>Hi I Am Clone AI</h1>
                </div>

                <p className='text-gray-400 text-base mt-2'>How Can I Help You Today?</p>


            </div>


            {/* Prompt Area */}

            <div className='w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1'>


                <div className='w-full flex justify-end'>

                    {lastMessage && (<div>

                        <div className='bg-red-600 text-white self-end max-w-[75%] break-all rounded-xl px-4 py-2'>{lastMessage} </div>
                    </div>)}



                </div>
            </div>

            {/* Input */}

            <div className='w-full max-w-4xl flex-1 relative mt-auto'>

                <div className='bg-[#2f2f2f] rounded-[2rem] px-6 py-8 shadow-md'>

                    <input type='text' placeholder='Message Clone AI' className='bg-transparent w-full text-white placeholder-gray-400 text-lg outline-none' value={inputVal} name='inputVal' onChange={(e) => setInputVal(e.target.value)} onKeyDown={handleKeyDown} />

                    <div className='flex items-center justify-between mt-4 gap-4'>

                        <div className='flex gap-2'>

                            <button className='flex items-center gap-2 border border-gray-500 text-white text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'>
                                <IoPulseOutline className='w-4 h-4' />
                                <span>Clone AI O1</span>
                            </button>

                        </div>

                        <div className='flex items-center gap-2'>

                            <button className='bg-gray-500 hover:bg-red-700 p-2 rounded-full text-white transition'>
                                <IoPaperPlane className='w-5 h-5' onClick={handleSend} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default PromptArea