import React from 'react'
import { Button, Modal } from "flowbite-react";
import { useState , useEffect } from "react";
import { toast } from 'react-toastify'

const UpdateCategory = ({id , open , setOpen , getAllCategories}) => {
    const [openModal, setOpenModal] = useState(open);
    const [credential, setCredential] = useState({ name: '' })

    const user = localStorage.getItem('auth');
    const parsedData = JSON.parse(user)
    const token = parsedData.accessToken;

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/update-category/${id}`, {
                method: "PUT",
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
                getAllCategories();
                setOpenModal(false);
                setOpen(false);
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
            toast.error("something error while Updating a category");
        }
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true) }>Toggle modal</Button>
            <Modal show={openModal} onClose={() => {setOpenModal(false); setOpen(false)}}>
                <form onSubmit={handleOnSubmit} className="space-y-4" >
                    <Modal.Header>Update The Category</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Category</label>
                                <input type="text" name="name" value={credential.name} onChange={(e) => setCredential({ ...credential, [e.target.name]: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Update the Category" required />
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' className='bg-blue-700'>Update</Button>
                        <Button color="gray" onClick={() =>{ setOpenModal(false); setOpen(false)}}>
                            cancle
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default UpdateCategory
