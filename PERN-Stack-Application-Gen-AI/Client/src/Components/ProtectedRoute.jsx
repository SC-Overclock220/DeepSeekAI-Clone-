import React, { useContext } from 'react'
import { AppContext } from '../Context/App.Context'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const contextData = useContext(AppContext);
    const { user } = contextData;
    return (

        <>


            {user ? <Outlet /> : <Navigate to='/login' />}
        </>



    )
}

export default ProtectedRoute