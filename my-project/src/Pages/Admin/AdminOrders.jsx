import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment'
import { useProduct } from '../../context/ProductContext';
import { Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import OrderDetail from './OrderDetail'
import { TiThMenu } from 'react-icons/ti'
import ResponsiveAdminMenu from '../../Components/Layout/ResponsiveAdminMenu'
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"]);
    const [changeStatus, setChangeStatus] = useState('');
    const [orders, setOrders] = useState([]);
    const [adminMenu, setAdminMenu] = useState(false);
    const { auth } = useAuth();
    const { images } = useProduct();
    const navigate = useNavigate();

    const toggleAdminMenu = (status) => {
      setAdminMenu(status);
    };

    const getOrder = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth?.token,
                },
            });
            const data = await response.json();
            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

  


    useEffect(() => {
        getOrder();
    }, [auth?.token]);

    const handleChange = async (id, value) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order-status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth?.token,
                },
                body: JSON.stringify({ status: value })
            });
            const data = await response.json();
            getOrder();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Layout title='All Orders Data'>
            <div className="pt-20 grid grid-cols-5 gap-4">
                <div className="md:col-span-1 md:block none">
                    <AdminMenu />
                </div>
                {adminMenu && <ResponsiveAdminMenu toggleAdminMenu={toggleAdminMenu} />}
                <div className="md:col-span-4 col-span-5  mx-4 md:mx-12 mb-4">
                    <div className='flex justify-between w-full ' >
                        <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleAdminMenu(true)}  ><TiThMenu className='text-xl' /></div>
                        <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">All Orders </h1>
                        <div className="text-xl font-bold mb-4 pt-8 pl-3 "> </div>
                    </div>
                    {orders?.map((o, i) => (
                        <div key={i}>
                            <div className="relative overflow-x-auto my-8 shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Buyer
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Payment
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                {/* <span className="">Quantity</span> */}
                                                Quantity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <Select onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status} >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s} ></Option>
                                                    ))}
                                                </Select>
                                            </th>
                                            <td className="px-6 py-4">
                                                {o?.buyer?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(o?.createdAt).fromNow()}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-green-600">
                                                {o?.payment?.success ? 'Success' : 'Failed'}
                                            </td>
                                            <td className="px-12 py-4 ">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{o?.products?.length}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="container">
                                <div className="flex flex-col justify-between lg:flex-row mb-4">
                                    {o?.products.map((p, index) => (
                                        <div key={index} className="flex items-center  mb-4 lg:mb-0">
                                            <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Product" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />

                                            <div className="flex items-center flex-col">
                                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                                <p className="text-lg font-semibold">${p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <span onClick={() => navigate(`/dashboard/admin/orders/detail/${o._id}`)} className='bg-blue-600 p-2 cursor-pointer text-white  rounded-lg  my-3'>more detail</span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
