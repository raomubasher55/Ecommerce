import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/AuthContext'
import AdminMenu from '../../Components/Layout/AdminMenu'
const Users = () => {
  const {auth} = useAuth();
  return (
    <Layout title={'Dashboard -All Users'}>
      <div className="p-20 grid grid-cols-2 gap-4">
        <div className="row-span-1">
          <AdminMenu />
        </div>
        <div className="row-span-1">
          <div className='card font-bold text-3xl ' >All Users</div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
