import React, { useContext } from 'react'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { AppContext } from './Context/App.Context'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {


  const contextData = useContext(AppContext);

  const { user, getUserData } = contextData;

  return (
    <>

      <ToastContainer />
      <Routes>


        <Route path='/' element={<ProtectedRoute />}>

          <Route index element={<Home />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>


    </>
  )
}

export default App