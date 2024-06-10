import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Profile = () => {
    return (
            <Layout title={'Your Profile'}>
                <div className="p-20 grid grid-cols-2 gap-4">
                    <div className="row-span-1">
                        <UserMenu />
                    </div>
                    <div className="row-span-1">
                        <div className='card' >Your  Profile</div>
                    </div>
                </div>
            </Layout>
    )
}

export default Profile
