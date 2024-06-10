import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../context/AuthContext'


const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <div className="p-20 grid grid-cols-2 gap-4">
        <div className="row-span-1">
          <AdminMenu />
        </div>
        <div className="row-span-1">
          <div className='card' >{auth?.user?.name}</div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
