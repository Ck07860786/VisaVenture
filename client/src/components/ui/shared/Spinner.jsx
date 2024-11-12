import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Spinner({ path = 'login' }) {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <h1 className='text-center'>Redirecting in {count} seconds...</h1>
        </div>
    );
}

export default Spinner;
