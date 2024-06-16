import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate , useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Components/Layout/Layout';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [password, setPassword] = useState(true);
    const {auth , setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSpinner(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',  //set cookies
                body: JSON.stringify({
                    email: credential.email,
                    password: credential.password
                }),
            });
            const data = await response.json();
            // console.log(data);   
            if (!data.success) {
                if (data.errors) {
                    toast.error(data.errors[0].msg, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error(data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } else {
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setAuth({...auth , 
                    user : data.user,
                    token: data.accessToken,
                    tokenType: data.tokenType,
                    role: data.role
                });
                localStorage.setItem('auth' , JSON.stringify(data))
                // console.log(location);
                navigate(location.state || '/')
            }
        } catch (error) {
            toast.error("An error occurred while logging in", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    return (
        <>
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 shadow-lg p-4">
                        <div>
                            <img className="mx-auto md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" src="/logo.png" alt="Pin logo" />
                            <h2 className="mt-6 text-center lg:text-3xl md:text-2xl text-xl font-extrabold text-gray-900">Login to your account</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <input onChange={onChange} value={credential.email} type="text" name="email" placeholder="Email" className="mb-4 block w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
                            <div className=' mb-4 flex justify-between items-center w-full bg-white  border border-gray-300 rounded-md    '>
                                <input onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password" className="   p-2  w-full rounded-md focus:outline-none" />
                                <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md">Login My Account</button>
                            {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                            <div className="text-center">
                                <Link to="/forget-password" className="text-blue-500">Forgot your password?</Link>
                            </div>
                        </form>
                        <footer className="text-xs text-gray-600">
                            <p>
                                By continuing, you agree to Pinterest's
                                <b className="font-bold"> Terms of Service </b>
                                and
                                <b className="font-bold"> Privacy Policy. </b>
                            </p>
                            <hr className="my-4 border-t border-gray-400" />
                            <div className="text-center">
                                <Link to="/signup" className="text-blue-500">Not on Pinterest yet? Sign up</Link>
                            </div>
                        </footer>
                    </div>
                    {/* <ToastContainer /> */}
                </div>
            </Layout>
        </>
    )
}

export default Login
