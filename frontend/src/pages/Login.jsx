import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , useLocation, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth.jsx';
import CryptoJS from 'crypto-js';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    //navigation hook and Location (Where to navigate after login)
    const navigate = useNavigate();
    const location = useLocation();

    //handleSubmit or Sign in method
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/auth/login`, { email, password });
           
            // console.log(res.data.check_user);
            // console.log("Role1: "+ res.data.check_user.role);
            
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.check_user.email,
                    token: res.data.token,
                    role: res.data.check_user.role
                });
                const encryption = CryptoJS.AES.encrypt(JSON.stringify(res.data), import.meta.env.VITE_LOCLSTORAGE_SECRET).toString();
                localStorage.setItem('auth',encryption);
                
                // const encryption = btoa(JSON.stringify(res.data));
                // localStorage.setItem('auth', encryption);
                // const decryption = atob('auth');
                // const data = localStorage.getItem('auth');
                // console.log(data);
                // console.log("decry: " + decryption);

                // console.log("Auth: "+auth.role);
                navigate(location.state || `/dashboard/${res.data.check_user.role==="admin"?"admin":"user"}`);
            }
            else {
                toast.error(res.data.message);
                navigate("/login");
            }
        }
        catch (error) {
            console.log(error);
            console.log(`Error in login user`);
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email"
                                    required value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <NavLink to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </NavLink>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password"
                                    autoComplete="current-password" required value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
