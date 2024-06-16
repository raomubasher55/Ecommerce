import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { auth , setAuth } = useAuth();
  const [credential, setCredential] = useState({ name: "", email: "", username: "", password: "", mobile: "", address: ""  });
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSpinner(true)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/updateprofile`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Authorization': auth.token
        },
        body: JSON.stringify({
            name: credential.name,
            email: credential.email,
            mobile: credential.mobile,
            address: credential.address,
            password: credential.password
        }),
    });
    const data = await response.json();
    console.log(data.data);
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
      navigate('/');
      setAuth({...auth ,user: data?.data});
      let ls = localStorage.getItem('auth');
      ls= JSON.parse(ls);
      ls.user = data.data;
      localStorage.setItem('auth',  JSON.stringify(ls))
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
    }

};
  useEffect(() => {
    const {name , email , mobile , address } = auth.user;
    setCredential({name:name , email:email , mobile:mobile , address:address , password:"" , })
  }, [auth?.user])
  
  return (
    <Layout title={'Dashboard -Ecommerence App'} >
      <div className="pt-32 grid grid-cols-2 gap-4">
        <div className="row-span-1">
          <UserMenu />
        </div>
        <div className="row-span-1 ">
          <div className='card pt-48' >
            <div className='w-full min-h-[120vh] bg-white'>
              <div className="h-screen w-full bg-cover backdrop-blur-10 flex justify-center items-center">
                <div className="  w-full max-w-md rounded-lg lg:mt-0 md:mt-9   mt-6 shadow-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="container mx-auto px-4 pb-3">
                    <div className="content text-center  ">
                      <img src="/logo.png" alt="Pin logo"
                        className="img1  mx-auto lg:mt-0 md:mt-1 mt-12 md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" />
                      <p className="header telg:text-3xl md:text-2xl text-xl font-bold m">Update Profile</p>

                      {/* Display errors */}
                      <div className="text-red-500 mb-4">
                        {/* <p>{errors.Error}</p> */}
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name"
                          className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.name} />
                        <input disabled type="email" name="email" placeholder="Email"
                          className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.email} />
                        <input type="number" name="mobile" placeholder="Phone"
                          className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.mobile} />
                        <div className=' mb-4 flex justify-between items-center w-full bg-white  border border-gray-300 rounded-md    '>
                          <input onChange={onChange} value={credential.password} type={password ? 'password' : 'text'} name="password" placeholder="Password" className="   p-2  w-full rounded-md focus:outline-none" />
                          <span onClick={() => setPassword(!password)} className='pr-4 inline-block' >{password ? <FaRegEye /> : <FaRegEyeSlash />}  </span>
                        </div>
                        <input type="text" name="address" placeholder="Address"
                          className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.address} />
                        <input type="submit"
                          className="btn int py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md cursor-pointer block w-full"
                          value="Register Account" />
                      </form>
                     
                    
                    </div>
                  </div>
                </div>
              </div>
              {/* <ToastContainer /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
