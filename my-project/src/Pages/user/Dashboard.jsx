import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout title={'Dashboard -Ecommerence App'} >
      <div className="p-20 grid grid-cols-2 gap-4">
        <div className="row-span-1">
          <UserMenu />
        </div>
        <div className="row-span-1">
          <div className='card text-2xl font-semibold' >
            <h1>{auth?.user?.name}</h1>
            <h1>{auth?.user?.email}</h1>
            <h1>{auth?.user?.mobile}</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
