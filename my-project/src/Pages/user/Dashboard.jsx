import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaListUl, FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPencil } from "react-icons/fa6";
 

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const [credential, setCredential] = useState({ name: "", email: "", username: "", password: "", mobile: "", address: "" });
  const [profile, setProfile] = useState({ image: "", sss: "" });
  const [dbImage, setDbImage] = useState();
  const [sidebar, setSidebar] = useState(false);
  const profileImagePath = auth?.user?.image ? `${import.meta.env.VITE_API_URL}/${auth.user.image}` : null;





  const onChange = (e) => { 
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const [password, setPassword] = useState(true);
  const navigate = useNavigate();

  const profilePic = () => {
    document.querySelector('#profilePic').click();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('name', credential.name)
    productData.append('description', credential.email)
    productData.append('quantity', credential.password)
    productData.append('shipping', credential.mobile)
    productData.append('address', credential.address)
    productData.append('image', dbImage)
    // setSpinner(true)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/updateprofile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        'Authorization': auth.token,
      },
      body: productData
    });
    const data = await response.json();
    console.log(data);
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
      navigate('/');
      setAuth({ ...auth, user: data?.data });
      let ls = localStorage.getItem('auth');
      ls = JSON.parse(ls);
      ls.user = data.data;
      localStorage.setItem('auth', JSON.stringify(ls))
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
    }

  };



  //on change on profile image
  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result;
        setProfile({ ...profile, image });
        setDbImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const toogleOnSidebar = () => {
    setSidebar(!sidebar)
  }

  useEffect(() => {
    const { name, email, mobile, address } = auth.user;
    setCredential({ name: name, email: email, mobile: mobile, address: address, password: "", })
  }, [auth?.user])

  return (
    <Layout title={'Dashboard -Ecommerence App'} >
      <div className="pt-20 grid grid-cols-5 gap-4">
        <div className="md:col-span-1 md:block none">
          <UserMenu/>
        </div>
        <div className="md:col-span-4 col-span-5  mx-4 md:mx-12 mb-4">
          {/* <div className='card pt-48' >
            <div className='w-full min-h-[120vh] bg-white'>
              <div className="h-screen w-full bg-cover backdrop-blur-10 flex justify-center items-center">
                <div className="  w-full max-w-md rounded-lg lg:mt-0 md:mt-9   mt-6 shadow-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="container mx-auto px-4 pb-3">
                    <div className="content text-center  ">
                      <img src="/logo.png" alt="Pin logo"
                        className="img1  mx-auto lg:mt-0 md:mt-1 mt-12 md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" />
                      <p className="header telg:text-3xl md:text-2xl text-xl font-bold m">Update Profile</p>

                      <div className="text-red-500 mb-4">
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
            </div>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Update Profile</h2>
              <div className="flex flex-col items-center w-full mb-6">
                <div className="relative">
                  <img
                    src={profile.image || profileImagePath || 'https://placehold.co/150x150'}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover border border-border"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-full">
                    <div onClick={profilePic} >
                      <input type="file" name="file" hidden onChange={handleImageUpload} id="profilePic" />
                      {/* <img  alt="edit-icon" src="https://openui.fly.dev/openui/24x24.svg?text=✏️" /> */}
                      <FaPencil />
                    </div>
                  </div>
                </div>
                <div>{auth?.user?.username}</div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6">
                <input type="text" onChange={onChange} value={credential.name} name='name' placeholder="Full Name" className="w-full md:w-1/2 p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-4 md:mb-0 md:mr-4" />
                <input type="email" onChange={onChange} value={credential.email} name='email' placeholder="Email Address" className="w-full md:w-1/2 p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary" readOnly />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6">
                <input type="number " onChange={onChange} value={credential.mobile} name='mobile' placeholder="New Password" className="w-full md:w-1/2 p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary mb-4 md:mb-0 md:mr-4" readOnly />
                <input type="text" onChange={onChange} value={credential.address} name='address' placeholder="Address" className="w-full md:w-w-1/2  p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary " />
              </div>
              <div className="flex justify-end w-full">
                <button onClick={() => navigate('/dashboard/user/profile')} className="bg-slate-100  hover:bg-slate-200 px-4 py-2 rounded-lg mr-4">Cancel</button>
                <div className="">
                  <input type="submit"
                    className="btn int py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white rounded-md cursor-pointer block w-full"
                    value="Save Change" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


    </Layout>
  )
}

export default Dashboard
