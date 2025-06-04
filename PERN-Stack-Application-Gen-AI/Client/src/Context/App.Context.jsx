import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {

    const baseURL = import.meta.env.VITE_BASE_URL;


    const [user, setUser] = useState(null);

    const getUserData = async () => {

        try {


            const { data } = await axios.get(`${baseURL}/auth/getUser`);


            console.log(data);

            if (data.success) {

                setUser(data.userData.rows[0]);
            }

            return;


        } catch (error) {


            console.log(error);
            return toast.error(error.response.data.message);

        }
    }

    useEffect(() => {


        getUserData();
    }, [])


    return <AppContext.Provider value={{ user, getUserData,setUser }}>{children}</AppContext.Provider>
}


export default AppContextProvider;