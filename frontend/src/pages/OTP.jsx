import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';

const OTP = () => {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  //handleOtp method
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const decrypt = CryptoJS.AES.decrypt(localStorage.getItem('reset'), import.meta.env.VITE_LOCLSTORAGE_SECRET).toString(CryptoJS.enc.Utf8);
      const obj = JSON.parse(decrypt);
      // console.log('obj', obj);
      const email = obj.email;
      // console.log(email);
      const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/auth/compareOTP`, { email, otp });
      if (res.data.success == true) {
        toast.success(res.data.message);
        navigate("/reset_password");
      }
      else {
        toast.error(res.data.message);
      }
    }
    catch (error) {
      console.log('Error:', error);
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
            OTP Verification
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  OTP
                </label>
              </div>
              <div className="mt-2">
                <input name="otp" type="password"
                  autoComplete="current-password" required value={otp}
                  onChange={(e) => { setOtp(e.target.value) }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button type="submit" onClick={handleOtp}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTP
