import React, { useEffect, useState } from 'react'
import { useNavigate , useLocation } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'


const Spinner = ({path = 'login'}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue)=> --preValue)
        }, 1000);
        count === 0 && navigate(`/${path}`,{
            state: location.pathname
        })
        return ()=> clearInterval(interval)
    }, [count , navigate , location , path])
    return (
        <>
        <div>
            <h1 className='font-bold text-3xl text-center p-11' >Redirecting to you in {count} seconds </h1>
        </div>
        <div className=' w-full flex text-center justify-center mt-[10%] items-center mx-auto '>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
            />
        </div>
        </>
    )
}

export default Spinner
