import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import ResponsiveAdminMenu from '../../Components/Layout/ResponsiveAdminMenu'
import { TiThMenu } from 'react-icons/ti'


const AdminDashboard = () => {
  const {auth } = useAuth();
  const [adminMenu, setAdminMenu] = useState(false);

  const toggleAdminMenu = (status) => {
    setAdminMenu(status);
  };

      return (
      <Layout title={'Your Profile'}>
      <div className=" p pt-20 grid grid-cols-5 gap-4">
          <div className="md:col-span-1 md:block none">
              <AdminMenu />
          </div>
          {adminMenu && <ResponsiveAdminMenu toggleAdminMenu={toggleAdminMenu} />}
          <div className="md:col-span-4 col-span-5  mx-4 md:mx-12 mb-4">
              <div >
              <div className='flex justify-between w-full ' >
                        <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleAdminMenu(true)}><TiThMenu className='text-xl' /></div>
                        <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">Admin Profile</h1>
                        <div className="text-xl font-bold mb-4 pt-8 pl-3 "> </div>
                    </div>
                  <hr />
                  <div className="p-4">
                      <div className="flex flex-col gap-24 md:flex-row items-center md:items-start ">
                          <img src="https://placehold.co/100x100" alt="User profile picture" className="w-48 h-48 rounded-full mb-4 md:mb-0 md:mr-4" />
                          <div className='mt-4' >
                              <h2 className="text-3xl font-bold">{auth?.user?.name}</h2>
                              <p className='text-lg mt-2' >{auth?.user?.mobile}</p>
                          </div>
                      </div>
                      <div className='mt-24'>
                          <div className="mt-4">
                              <p className="font-bold">Address:</p>
                              <p>Masjid Khaliqa Razaqia ward no 5 Dunga Bunga</p>
                          </div>
                          <div className="mt-4">
                              <p className="font-bold">Password:</p>
                              <input type="password" defaultValue="************" className="px-4 py-2 border rounded bg-input text-foreground" readOnly />
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

export default AdminDashboard
