import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../context/AuthContext';
import moment from 'moment';
import { useProduct } from '../../context/ProductContext';
import ResponsiveUserMenu from '../../Components/Layout/ResponsiveUserMenu';
import { TiThMenu } from 'react-icons/ti';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
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
            // console.log(data.orders);
            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleOnUserMenu = (status) => {
        setUserMenu(status);
      };



    useEffect(() => {
        getOrder();
    }, [auth?.token]);

    return (
        <Layout title={'Your Orders'}>
            <div className='pt-20'>
                <div className=" grid grid-cols-5 gap-4">
                    <div className="md:col-span-1 none  md:block">
                        <UserMenu />
                    </div>
                    {userMenu &&  <ResponsiveUserMenu toggleOnUserMenu={toggleOnUserMenu} />}
                    <div className="md:col-span-4 col-span-5">
                        {/* <div className="card">Your Orders</div>
                    {orders?.map((o, i) => (
                        <div key={i}>
                            <div className="relative overflow-x-auto mt-3 shadow-md sm:rounded-lg">
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
                                    {o?.products.map((p, index) => (
                                        <div key={index} className="flex items-center  mb-4 lg:mb-0">
                                            <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Product image" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
                                            <div className="flex items-center flex-col">
                                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                                <p className="text-lg font-semibold">${p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))} */}
                        <div className='flex flex-row   ' >
                            <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleOnUserMenu(true)}  ><TiThMenu className='text-xl' /></div>
                            <h1 className="text-xl font-bold mb-4 pt-8 pl-3 ">Orders</h1>
                        </div>
                        <hr className='my-5' />
                        {/*New design  */}
                        <div className="flex-1 bg-white shadow-md  md:mx-12 ">
                            {orders?.map((o, i) => (
                                <div key={i} className="space-y-4  bg-gray-50 shadow-lg rounded-md mb-24 p-4">
                                    <div className='font-semibold'>{moment(o?.createdAt).fromNow()}</div>
                                    {o?.products.map((p, index) => (
                                        <div key={index} className="bg-white shadow-md md:p-4 p-2 flex flex-col md:flex-row justify-between md:items-center">
                                            <div className="flex items-center space-x-4">
                                                <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Product image" className="md:w-24 md:h-24 w-12 h-12 rounded-md mr-4" crossOrigin="anonymous" />
                                                <div>
                                                    <div className="text-zinc-500">product id: {p._id} </div>
                                                    <div className="text-xl font-bold">{p.name}</div>
                                                    <div className="text-zinc-500">color: Blue</div>
                                                    <div className="text-zinc-500">size: M</div>
                                                    <div className="text-zinc-500">Quantity: <span className="font-bold">{p.quantity}</span></div>
                                                    <div className="text-zinc-500">Place on: {p.createdAt.slice(0, 10)}   </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
                                                <div className="text-green-500 font-semibold">{o?.payment?.success ? "Paid" : "Unpaid"}</div>
                                                <div className="text-xl font-bold">{p.price} $</div>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded">cancel</button>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>








        </Layout>
    );
};

export default Orders;
