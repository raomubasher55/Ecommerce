import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext'
import { FaPencilAlt } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-toastify';



const Cart = () => {
    const { auth, setAuth } = useAuth();
    const { cart, setCart } = useCart();
    const { images } = useProduct();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null); // Changed to null
    const dropinRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const user = localStorage.getItem('auth');
    const parsedData = JSON.parse(user)
    const token = parsedData ? parsedData.accessToken : null;

    const removeCartItem = (id) => {
        try {
            let myCart = [...cart];
            let newCart = myCart.filter(item => item._id !== id)
            // let index = myCart.findIndex(item => item._id === id);
            // console.log(myCart.splice(index, 1))
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart))
        } catch (error) {
            console.log(error);
        }
    }
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((p) => total += p.price);
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        } catch (error) {
            console.log(error);
        }
    };


    //get payment token
    const getToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/braintree/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            // console.log(data);
            setClientToken(data.response.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePayment = async () => {
        if (!instance) {
            toast.error("Payment instance not initialized.");
            return;
        }
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            if (!nonce) {
                throw new DropinError({ message: "No payment method is available." });
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/braintree/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ nonce, cart })
            });
            setLoading(false);
            const data = await response.json();
            console.log(data);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success('Payment Completed Successfully');
        } catch (error) {
            if (error instanceof DropinError) {
                toast.error(error.message);
            } else {
                console.log(error);
                toast.error("Payment failed. Please try again.");
            }
            setLoading(false);
        }
    }
    

    useEffect(() => {
        getToken();
        // console.log(clientToken);  
    }, [auth?.token])

    return (
        <Layout>
            <div className="pt-24">
                <div className="flex flex-col items-center p-4 bg-zinc-100 dark:bg-zinc-900 min-h-screen">
                    <h1 className="text-3xl font-bold mb-4">Hello {auth?.token && auth?.user?.name}</h1>
                    <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                    {cart?.length > 1 ?
                        `You have ${cart.length} items in your cart ${auth?.token ? "" : 'Please login to checkout'}` :
                        'Your cart is empty'}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl w-full">
                        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Cart ({cart.length < 1 ? '0' : cart.length} items)</h2>
                            {cart.map((p, index) => (
                                <div key={index} className="flex flex-col lg:flex-row mb-4">
                                    <div className="flex items-center mb-4 lg:mb-0">
                                        <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Blue Hoodie" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{p.name}</h3>
                                            <p className="text-zinc-600 dark:text-zinc-400">Hodie-B</p>
                                            <p className="text-zinc-600 dark:text-zinc-400">Color: Blue</p>
                                            <p className="text-zinc-600 dark:text-zinc-400">Size: M</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => removeCartItem(p._id)} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md mr-2">
                                                    Remove Item
                                                </button>
                                                <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                    Move To Wish List
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-4">
                                            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                -
                                            </button>
                                            <span className="mx-2">0</span>
                                            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg font-semibold">${p.price}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex items-center mb-4 lg:mb-0">
                                    <img src="https://placehold.co/100x100" alt="White Hoodie" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
                                    <div>
                                        <h3 className="text-lg font-semibold">White Hoodie</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">Hodie-W</p>
                                        <p className="text-zinc-600 dark:text-zinc-400">Color: White</p>
                                        <p className="text-zinc-600 dark:text-zinc-400">Size: M</p>
                                        <div className="flex items-center mt-2">
                                            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md mr-2">
                                                Remove Item
                                            </button>
                                            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                Move To Wish List
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center mr-4">
                                        <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                            -
                                        </button>
                                        <span className="mx-2">0</span>
                                        <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                            +
                                        </button>
                                    </div>
                                    <p className="text-lg font-semibold">$35.99</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">The total amount of</h2>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <span>Temporary amount</span>
                                    <span>{totalPrice()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Gratis</span>
                                </div>
                                {auth?.user?.address ? (
                                    <div className="flex justify-between">
                                        <span>Address</span>
                                        <div className='flex justify-between items-center gap-5' ><span onClick={() => navigate('/dashboard/user')} ><FaPencilAlt /></span>{auth?.user?.address}</div>
                                    </div>
                                ) :
                                    (
                                        <div className="flex justify-between">
                                            <span>Address</span>
                                            <div onClick={() => navigate('/dashboard/user')} className='flex justify-between items-center gap-5' ><span  ><IoAddCircle /></span>Add Address</div>
                                        </div>
                                    )}
                                <div className="flex justify-between font-bold mt-2">
                                    <span>The total amount of (Including VAT)</span>
                                    <span>{totalPrice()}</span>
                                </div>
                            </div>
                            {auth?.token ? (
                                <button className="bg-blue-500 text-white w-full py-2 rounded-md mb-4">Go To Checkout</button>
                            ) : (
                                <button onClick={() => navigate('/login', { state: '/cart' })} className="bg-yellow-400 text-white w-full py-2 rounded-md mb-4">Login to Checkout</button>
                            )}
                            <div>
                                <label htmlFor="discount-code" className="block mb-2">Add a discount code (optional)</label>
                                <input type="text" id="discount-code" className="w-full p-2 border rounded-md" placeholder="Enter discount code" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">The total amount of</h2>
                            <div id="dropin-container"></div>
                            {clientToken ? (
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault',
                                        }
                                    }}
                                    onInstance={(instance) => {
                                        setInstance(instance); // Changed to setInstance
                                    }}
                                />
                            ) : <span>Loading payment options...</span>}
                            <button
                                disabled={!instance || !auth?.user?.address}
                                onClick={handlePayment}
                                className="bg-blue-500 text-white w-full py-2 rounded-md mb-4">
                                {loading ? '..Processing' : 'Make Payment'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default Cart
