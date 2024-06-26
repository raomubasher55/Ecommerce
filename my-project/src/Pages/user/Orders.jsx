import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../context/AuthContext';
import moment from 'moment';
import { useProduct } from '../../context/ProductContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { auth } = useAuth();
    const { images } = useProduct();

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
            console.log(data.orders);
            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrder();
    }, [auth?.token]);

    return (
        <Layout title={'Your Orders'}>
            <div className="pt-32 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <UserMenu />
                </div>
                <div className="col-span-2">
                    <div className="card">Your Orders</div>
                    {orders?.map((o, i) => (
                        <div key={i}>
                            <div  className="relative overflow-x-auto mt-3 shadow-md sm:rounded-lg">
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
                                                <span className="sr-only">Quantity</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {o?.status}
                                            </th>
                                            <td className="px-6 py-4">
                                                {o?.buyer?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(o?.createdAt).fromNow()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {o?.payment?.success ? 'Success' : 'Failed'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{o?.products?.length}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="container">
                                <div className="flex flex-col justify-between lg:flex-row mb-4">
                                    {o?.products.map((p , index) => (
                                        <div key={index} className="flex items-center  mb-4 lg:mb-0">
                                            <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Product" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
                                            
                                            <div className="flex items-center flex-col">
                                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                                <p className="text-lg font-semibold">${p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
