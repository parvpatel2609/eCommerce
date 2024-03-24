import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path ="/"}) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((pre_val) => --pre_val)
        }, 1000);
        count === 0 && navigate(`${path}`, {
            state: location.pathname
        });
        return () => clearInterval(interval);  //cleanup when the component unmount
    }, [count, navigate, location, path]);


    return (
        <>
            <div class="flex flex-column items-center justify-center h-screen">
                <h1 className='Text-center'>Redirecting to login page in {count} second</h1>
                <br />
                <br />
                <div class="relative">
                    <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Spinner;
