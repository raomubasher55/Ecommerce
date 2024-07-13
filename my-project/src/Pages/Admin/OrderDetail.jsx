import React, { useEffect, useState, useCallback } from 'react'
import { Layout } from 'antd'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


const OrderDetail = () => {
    const { auth } = useAuth();
    const { images, orderProduct } = useProduct();
    const params = useParams();
    const { orderId } = params;
    const user = localStorage.getItem('auth');
    const parsedData = JSON.parse(user);
    const token = parsedData ? parsedData.accessToken : null;

    const getSingleProduct = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/order-product/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            const data = await response.json();
            if (data.success) {
                // setSingleProduct(data.products);
                // similarProducts(data.products._id, data.products.category._id);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while getting single products');
        }
    }, []);


    useEffect(() => {
        if (orderId) orderProduct
    }, [orderId && auth?.token]);




    return (
        <div>
            <Layout title={'Order details'}>
                <div className='pt-12'>
                    <div className=" grid grid-cols-5 gap-4 min-h-screen">
                        <div className="col-span-1">
                            <UserMenu />
                        </div>
                        <div className="col-span-4">
                            <h2 className="text-2xl font-bold mb-4 mx-12">Orders Details</h2>
                            <hr className='my-5' />
                            {/* New design */}
                            <div className="flex-1 bg-white shadow-  mx-12 ">
                                {orderProduct?.map((p, i) => (
                                    <div key={i} className="space-y-4  bg-gray-100  rounded-md p-4">
                                        <div  className='font-semibold'>{moment(p?.createdAt).fromNow()}</div>
                                        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Product image" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
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
                                                <div className="text-green-500 font-semibold">{p?.payment?.success ? "Paid" : "Unpaid"}</div>
                                                <div className="text-xl font-bold">{p.price} $</div>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded">cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default OrderDetail
