import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Components/Layout/Layout';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Signup = () => {
    const [credential, setCredential] = useState({ name: "", email: "", username: "", password: "", mobile: "" , answer: "" });
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSpinner(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                mobile: credential.mobile,
                password: credential.password,
                answer: credential.answer
            }),
        });
        const data = await response.json();
        console.log(data);
        // setSpinner(false);
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
                toast.error(data.msg, {
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
        }else{
            toast.success(data.msg , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/');
        }

    };
    return (
        <>
            <Layout>
                <div className='w-full min-h-[120vh] bg-white'>
                    <div className="h-screen w-full bg-cover backdrop-blur-10 flex justify-center items-center">
                        <div className="w-full max-w-md rounded-lg lg:mt-0 md:mt-9   mt-6 shadow-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="container mx-auto px-4 pb-3">
                                <div className="content text-center  ">
                                    <img src="/logo.png" alt="Pin logo"
                                        className="img1  mx-auto lg:mt-0 md:mt-1 mt-12 md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" />
                                    <p className="header telg:text-3xl md:text-2xl text-xl font-bold m">Create an account to see more</p>

                                    {/* Display errors */}
                                    <div className="text-red-500 mb-4">
                                        {/* <p>{errors.Error}</p> */}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input type="text" name="name" placeholder="Full Name"
                                            className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.name} />
                                        <input type="email" name="email" placeholder="Email"
                                            className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.email} />
                                        <input type="number" name="mobile" placeholder="Phone"
                                            className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.mobile} />
                                        <div className=' mb-4 flex justify-between items-center w-full bg-white  border border-gray-300 rounded-md    '>
                                            <input onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password" className="   p-2  w-full rounded-md focus:outline-none" />
                                            <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                                        </div>
                                        <input type="text" name="answer" placeholder="What is Your Favourite Sport"
                                            className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.answer} />
                                        <input type="submit"
                                            className="btn int py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md cursor-pointer block w-full"
                                            value="Register Account" />
                                    </form>
                                    <a href="/forget" className="text-blue-500 block mb-4">Forgot your password?</a>

                                    <p className="or my-4 text-xl font-bold">OR</p>

                                    <button className="btn fbk py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer mb-2 block w-full">
                                        <i className="fab fa-facebook fa-lg" style={{ color: 'white', paddingRight: '10px' }}></i>Continue with Facebook
                                    </button>
                                    <button className="btn ggl py-2 px-4 bg-yellow-500 text-black rounded-md cursor-pointer mb-4 block w-full">
                                        <i className="fab fa-google" style={{ color: 'black', paddingRight: '10px' }}></i>Continue with Google
                                    </button>

                                    <footer className="text-xs text-gray-600">
                                        <p>
                                            By continuing, you agree to Pinterest's
                                            <b className="font-bold">Terms of Service</b> and
                                            <b className="font-bold">Privacy Policy.</b>
                                        </p>
                                        <hr className="my-4 border-t border-gray-400" />
                                        <Link to="/login" className="text-blue-500 block">Already on Pinterest? Login</Link>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ToastContainer /> */}
                </div>
            </Layout>
        </>
    )
}

export default Signup
