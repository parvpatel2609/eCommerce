import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reset_Password = () => {

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirm_password) {
                toast.error("Password and Confirm password are different");
            }
            if (password.length < 6 && confirm_password.length < 6) {
                toast.error("Password and confirm password must be greater than 6");
            }
            else {
                const decrypt = CryptoJS.AES.decrypt(localStorage.getItem('reset'), import.meta.env.VITE_LOCLSTORAGE_SECRET).toString(CryptoJS.enc.Utf8);
                const obj = JSON.parse(decrypt);
                // console.log('obj', obj);
                const email = obj.email;

                const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/auth/update-password`, { email, password });
                if (res.data.success == true) {
                    toast.success(res.data.message);
                    localStorage.removeItem('reset');
                    navigate("/");
                }
                else {
                    toast.error(res.data.message);
                }
            }
        }
        catch (error) {
            // console.log(error);
            toast.error("Something went wrong in updating password" + error);
        }
    }

    return (
        <Layout title={"New Password"}>
            <div>
                <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid" id="mynavbar">
                        <a className="navbar-brand" id="logo">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                        </a>
                        <h2>Reset Password</h2>
                    </div>
                </nav>

                <div className="px-4 py-5 my-5 text-center">
                    <img src="/image/forgot_password.jpg" className="mb-3 reset" alt="Image of forgot password" style={{ width: 115 }} />
                    <div className="col-lg-6 mx-auto">

                        <form>
                            <div className="form-floating mb-3">
                                <input type="password" name="password" className="form-control" value={password}
                                    id="floatingPassword" placeholder="Password" required
                                    onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="form-floating">
                                <input type="password" name="password" className="form-control" value={confirm_password}
                                    id="floatingPassword" placeholder="Password" required
                                    onChange={(e) => setConfirm_Password(e.target.value)} />
                                <label htmlFor="floatingPassword">Confirm Password</label>
                            </div>

                            <div className="col-auto mb-3">
                                <span id="passwordHelpInline" className="form-text">
                                    Password must be 6-20 characters long.
                                </span>
                            </div>

                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button onClick={handleSubmit} className="btn btn-primary btn-lg px-4 gap-3">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Reset_Password
