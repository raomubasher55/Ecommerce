import React, { useState } from 'react'
import { Select } from 'antd'
const { Option } = Select
import { useProduct } from '../../context/ProductContext'
import { useCategory } from '../../context/CategoryContext'
import { TiThMenu } from 'react-icons/ti'

const CreateNewProduct = ({toggleAdminMenu}) => {
    const [category, setCategory] = useState([]);
    const [shipping, setShipping] = useState();
    const [product, setProduct] = useState({ name: '', description: '', quantity: '', price: '', image: '', });
    const [preview, setPreview] = useState();
    const { createProduct } = useProduct();
    const { categories } = useCategory();



    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file })       //backend me direct file send krai hoti h
            //          <--enough for backend--->
            //for fornt end for image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const preImage = reader.result;
                setPreview(preImage);
            }
            reader.readAsDataURL(file);
        }
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await createProduct(product.name, product.description, product.quantity, product.price, category, product.image, !!shipping);
    }
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className='grid grid-cols-3 '>
                    <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className=" overflow-y-auto overflow-x-hidden  md:col-span-2 col-span-3 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    >
                        <div className="relative p-4 w-full  max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <div className='block  md:hidden  pt-2 pl-3' onClick={toggleAdminMenu   }  ><TiThMenu className='text-xl' /></div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Product </h1>
                                    <div className="text-xl font-bold mb-4 pt- pl-3 "> </div>

                                </div>
                                <div className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input onChange={onChange} value={product.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                            <input onChange={onChange} value={product.price} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <Select className='w-full custom-select no-border' name='category' placeholder='Select the Category' size='large' showSearch onChange={(value) => { setCategory(value) }} >
                                                {categories?.map((item, index) => (
                                                    <Option key={index} value={item._id} variant='null' name='category' >
                                                        {item.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <input onChange={onChange} value={product.quantity} type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="shipping" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping</label>
                                            <Select className='w-full custom-select no-border' allowClear required name='shipping' variant='filled' placeholder='Select Shipping' size='large' showSearch onChange={(value) => { setShipping(value === '1') }} >
                                                <Option value='1'>Yes</Option>
                                                <Option value='0'>No</Option>
                                            </Select>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                            <textarea id="description" onChange={onChange} value={product.description} name='description' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        Add new product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:pt-10 ml-5 md:mr-0 md:col-span-1 col-span-3 '>
                        {!preview ? <div className="flex items-center justify-center w-full ">
                            <label htmlFor="dropzone-file" className="flex flex-col mr-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" onChange={handleImageUpload} name='image' className="hidden" />
                            </label>
                        </div> :
                            <img src={preview} alt="image" />
                        }

                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateNewProduct
