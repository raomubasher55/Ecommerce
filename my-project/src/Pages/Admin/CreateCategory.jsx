import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/AuthContext'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { toast } from 'react-toastify'
import CategoryForm from '../../Components/Form/CategoryForm';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import UpdateCategory from '../../Components/Form/UpdateCategory'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  const user = localStorage.getItem('auth');
  const parsedData = JSON.parse(user)
  const token = parsedData.accessToken;

  const getAllCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/get-category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (data.success) {
        setCategories(data.category)
      } else {
        toast.error(data.message, {
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
    } catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while getting categories')
    }
  }
  const handleOnDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/delete-category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        credentials: "include"
      })
      const data = await response.json();
      if (data.success) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getAllCategories();
      } else {
        toast.error(data.message, {
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
    } catch (error) {
      console.log(error);
      toast.error('Somethine went wrong while Deleting categories')
    }
  }
  useEffect(() => {
    getAllCategories();
  }, [])



  return (
    <Layout title={'Dashboard -Create Category'}>
      <div className="p-20 grid grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <AdminMenu />
        </div>
        <div className="col-span-2">
          <div className="card font-bold text-3xl my-5">Manage Category</div>
          <div>
            <CategoryForm getAllCategories={getAllCategories} />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Update
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.map((value, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value.name}
                      </th>
                      <td onClick={() => { setId(value._id); setOpen(true); }} className="px-6 py-4">
                        <button className="font-bold text-xl text-yellow-400 dark:text-blue-500 hover:underline"><GrEdit /></button>
                      </td>
                      <td onClick={() => handleOnDelete(value._id)} className="px-6 py-4">
                        <button className="font-bold text-xl text-red-600 dark:text-red-500 hover:underline"><RiDeleteBin6Line /></button>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
      {open && <UpdateCategory id={id} open={open} setOpen={setOpen} getAllCategories={getAllCategories} />}
    </Layout>

  )
}

export default CreateCategory
