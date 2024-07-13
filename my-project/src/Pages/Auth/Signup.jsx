import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Components/Layout/Layout';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Signup = () => {
    const [credential, setCredential] = useState({ name: "", email: "", username: "", password: "", mobile: "", answer: "" });
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
        } else {
            toast.success(data.msg, {
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
                <div className="flex items-center justify-center min-h-screen bg-background pt-20 dark:bg-black">
                    <div className="bg-card dark:bg-card p-8 rounded-lg shadow-l bg-slate-100 w-full max-w-md flex flex-col items-">
                        {/* <h1 className="text-2xl text-center font-bold mb-4"><img className='h-20 w-20' src="/logo.png" alt="" /></h1> */}
                        <h2 className="text-3xl font-bold mb-2">Welcome to the <span className="text-blue-500 dark:text-blue-400">(CartCove)</span></h2>
                        <p className="text-2xl font-bold mb-6">create your account</p>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="mb-4">
                                <input type="text" placeholder="Full Name" name='name' onChange={onChange} value={credential.name} className="w-full p-3    border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Email" name='email' onChange={onChange} value={credential.email} className="w-full p-3   border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <input type="tel" placeholder="Phone" name='mobile' onChange={onChange} value={credential.mobile} className="w-full p-3   border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="What is your favorite sport"  name="answer" onChange={onChange} value={credential.answer} className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                            </div>
                            <div className="mb-4 relative">
                                <input
                                    onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password"
                                    className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 pr-10"
                                />
                                <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 dark:text-zinc-500" >
                                <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                                </button>
                            </div>
                            <button type="submit" className="w-full bg-blue-500 dark:bg-blue-500 text-white dark:text-white p-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600">Create Account</button>
                            <p className="text-center mt-4 text-sm text-blue-500 dark:text-blue-400 hover:underline">Forgot your password?</p>
                        </form>
                        <div className="text-center mt-4 text-sm text-primary dark:text-primary-foreground">
                            By continuing, you agree to CoveCart's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                            <hr className="my-4 border-t border-gray-400" />
                            <Link to="/login" className="text-blue-500 block">Already on CoveCart? Login</Link>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Signup
