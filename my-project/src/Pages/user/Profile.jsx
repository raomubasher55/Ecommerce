import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
        const {auth } = useAuth();
        console.log(auth.user);
    return (
        <Layout title={'Your Profile'}>
            <div className="p-20 grid grid-cols-5 gap-4">
                <div className="col-span-1">
                    <UserMenu />
                </div>
                <div className="col-span-4 w-full">
                    <div >
                        <h1 className="text-xl font-bold mb-4 ">User Profile</h1>
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

export default Profile
