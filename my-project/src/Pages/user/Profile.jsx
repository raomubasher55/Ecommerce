import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircle } from "react-icons/io";
import { IoClose } from 'react-icons/io5'
import { FaListUl } from 'react-icons/fa6';
import { TiThMenu } from "react-icons/ti";
import ResponsiveUserMenu from '../../Components/Layout/ResponsiveUserMenu'




const Profile = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const [userMenu, setUserMenu] = useState(false);

    const profileImagePath = auth?.user?.image ? `${import.meta.env.VITE_API_URL}/${auth.user.image}` : null;

    const toogleOnSidebar = () => {
        setSidebar(!sidebar)
    }

    const toggleOnUserMenu = (status) => {
        setUserMenu(status);
      };

    return (
        <Layout title={'Your Profile'}>
            <div className="pt-20 grid grid-cols-5 gap-4 w-full ">
                <div className="md:col-span-1 md:block none">
                    <UserMenu />
                </div>
              {userMenu &&  <ResponsiveUserMenu toggleOnUserMenu={toggleOnUserMenu} />}
                <div className="md:col-span-4 col-span-5 w-full">
                    <div >
                        <div className='flex flex-row   ' >
                            <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleOnUserMenu(true)}  ><TiThMenu className='text-xl' /></div>
                            <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">User Profile</h1>
                        </div>
                        <hr />
                        <div className="p-4">
                            <div className="flex justify-between" >
                                <div className="flex flex-col md:gap-24 gap-2 md:flex-row md:items-center ">
                                    <img src={profileImagePath ? profileImagePath : `https://placehold.co/100x100`} alt="User profile picture" className="md:w-48 md:h-48  w-32 h-32 rounded-full mb-4  md:mb-0 md:mr-4" />
                                    <div className='mt-4' >
                                        <h2 className="md:text-3xl  text-2xl font-bold">{auth?.user?.name}</h2>
                                        <p className='text-lg mt-2 text-slate-500' >{auth?.user?.username}</p>
                                        <p className='text-lg mt-2' >{auth?.user?.mobile}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => navigate('/dashboard/user')} className="bg-blue-600 rounded-lg px-4 py-1 text-white text-center">Edit Profile </button>
                                </div>
                            </div>
                            <div className='mt-24'>
                                <div className="mt-4">
                                    <div className='flex items-center gap-3'>

                                        <p className="font-bold">Address:</p>
                                        {auth?.user?.address ? <p>{auth?.user?.address}</p> :
                                            <div onClick={() => navigate('/dashboard/user')} className='text-xl'>
                                                <IoIosAddCircle />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="font-bold">Mobile:</p>
                                    <input type="text" value={auth?.user?.mobile} className="px-4 py-2 border rounded bg-input text-foreground" readOnly />
                                </div>
                                <div className="mt-4">
                                    <p className="font-bold">Email:</p>
                                    <input type="email" defaultValue={auth?.user?.email} className="px-4 py-2 border rounded bg-input text-foreground" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
