import { parse } from 'dotenv';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CategoryForm = ({ getAllCategories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [credential, setCredential] = useState({ name: '' })

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const user = localStorage.getItem('auth');
  const parsedData = JSON.parse(user)
  const token = parsedData.accessToken;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/create-category`, {
        method: "POST",
        credentials: 'include',  //set cookies
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: credential.name
        }),
      });
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
        toggleModal();
        setCredential(credential.name = "")
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
      getAllCategories()
    } catch (error) {
      console.log(error);
      toast.error("something error while creating a new category");
    }
  }
  return (
    <>
      <button
        onClick={toggleModal} className="block my-3 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Add New Category
      </button>
      {modalVisible && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden z-10 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center  justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold  text-gray-900 dark:text-white">
                  Add The Category
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close </span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">

                <form onSubmit={handleOnSubmit} className="space-y-4" >
                  <div>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Category</label>
                    <input type="text" name="name" value={credential.name} onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Add the Category" required />
                  </div>
                  <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Add</button>
                    <button onClick={toggleModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}



    </>
  );
};

export default CategoryForm;
