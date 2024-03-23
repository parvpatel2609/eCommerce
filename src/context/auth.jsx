import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import axios from "axios";

const AuthContext = createContext();
// console.log("AuthContext: " + AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        role:""
    });

    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        if (localStorage.getItem('auth') != null) {
            const decryption = CryptoJS.AES.decrypt(localStorage.getItem('auth'), import.meta.env.VITE_LOCLSTORAGE_SECRET).toString(CryptoJS.enc.Utf8);
            const parseData = JSON.parse(decryption);
            if (parseData) {
                setAuth({
                    ...auth,
                    user: parseData.check_user,
                    token: parseData.token,
                    role: parseData.check_user.role
                });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };