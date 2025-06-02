import React from 'react'
import Sidebar from './Sidebar'
import PromptArea from './PromptArea'

const Home = () => {
  return (
    <>
      <div className='flex h-screen bg-app-dark text-white '>



        {/* // Sidebar */}
        <div className='w-64 bg-sidebar-dark'>


          <Sidebar />


        </div>


        {/* Prompt */}


        <div className='flex-1 flex flex-col w-full'>

          <div className='flex-1 flex items-center justify-center px-6 '>


            <PromptArea />
          </div>

        </div>



      </div>

    </>

  )
}

export default Home