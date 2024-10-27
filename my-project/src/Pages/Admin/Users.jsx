import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/AuthContext'
import AdminMenu from '../../Components/Layout/AdminMenu'
import ResponsiveAdminMenu from '../../Components/Layout/ResponsiveAdminMenu'
import { TiThMenu } from 'react-icons/ti'
const Users = () => {
  const { users, deleteUser } = useAuth();
  const [adminMenu, setAdminMenu] = useState(false);

  const toggleAdminMenu = (status) => {
    setAdminMenu(status);
  };
  
  return (
    <Layout title={'Dashboard -All Users'}>
      {users && <div className="pt-20 grid grid-cols-5">
        <div className="md:col-span-1 none md:block" >
          <AdminMenu />
        </div>
     {adminMenu &&   <ResponsiveAdminMenu toggleAdminMenu={toggleAdminMenu} />}
        <div className="md:col-span-4 col-span-5">
          <div className='' >
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md w-full max-w-4xl mx-auto">
              <div className='flex justify-between w-full ' >
                <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleAdminMenu(true)}  ><TiThMenu className='text-xl' /></div>
                <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">Users management </h1>
                <div className="text-xl font-bold mb-4 pt-8 pl-3 "> </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6">
                <input type="text" placeholder="Search users..." className="w-full md:w-1/2 p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-background border border-border rounded-lg">
                  <thead>
                    <tr className="bg-secondary text-secondary-foreground">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 text-foreground">{index + 1}</td>
                        <td className="px-4 py-2 text-foreground">{user.name}</td>
                        <td className="px-4 py-2 text-foreground">{user.email}</td>
                        <td className="px-4 py-2 text-foreground">{user.role == 1 ? "admin" : "user"}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => deleteUser(user._id)} className="bg-red-600 text-white hover:bg-destructive/80 px-2 py-1 rounded-lg ml-2">Delete</button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>}
    </Layout>
  )
}

export default Users
