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
    const { images, setWishList, wishList } = useProduct();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null); // Changed to null
    // const dropinRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(null);


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

    // Move to wish List 
    const wishCartItem = (id) => {
        let myCart = [...cart];
        let wishItem;

        let newCart = myCart.filter((item => {
            if (item._id !== id) {
                return true;
            } else {
                wishItem = item;
                return false;
            }
        }));
        setCart(newCart);

        localStorage.setItem('cart', JSON.stringify(newCart))

        if (wishItem) {
            // Update the wishlist state
            setWishList((prev) => [...prev, wishItem]);
            
            // Retrieve current wishlist from local storage or create a new one if it doesn't exist
            let currentWishList = JSON.parse(localStorage.getItem('wishList')) || [];
            
            // Add the new item to the wishlist
            currentWishList.push(wishItem);
            
            // Update the wishlist in local storage
            localStorage.setItem('wishList', JSON.stringify(currentWishList));
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

    //handle on increment 
    const handleOnIncrement = (id) => {
        if (cart.length > 0) {
            setCart(cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
        }
    }

    //handle on Decrement
    const handleOnDecrement = (id) => {
        if (cart.length > 0) {
            setCart(cart.map((item) => item._id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item));
        }
    }


    useEffect(() => {
        getToken();
    }, [auth?.token])

    return (
        <Layout>
            <div className="pt-24">
                {cart.length >= 1 ? <div className="flex flex-col w-full items-center p-4 bg-zinc-100 dark:bg-zinc-900 min-h-screen">

                    <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Cart ({cart.length < 1 ? '0' : cart.length} items)</h2>
                            {cart.map((p, index) => (
                                <div key={index} className="flex flex-col lg:flex-row justify-between mb-4">
                                    <div className="flex items-center mb-4 lg:mb-0">
                                        <img src={images[p._id] ? '/' + images[p._id] : `https://placehold.co/100x100`} alt="Blue Hoodie" className="w-24 h-24 rounded-md mr-4" crossOrigin="anonymous" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{p.name}</h3>
                                            <p className="text-zinc-600 dark:text-zinc-400">Hodie-B</p>
                                            <p className="text-zinc-600 dark:text-zinc-400">Color: Blue</p>
                                            <p className="text-zinc-600 dark:text-zinc-400">Size: M</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => removeCartItem(p._id)} className="bg-red-600  text-white  px-2 py-1 rounded-md mr-2">
                                                    Remove Item
                                                </button>
                                                <button onClick={() => wishCartItem(p._id)} className="bg-slate-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                    Move To Wish List
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex items-center mr-4">
                                            <button onClick={() => handleOnDecrement(p._id)} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                -
                                            </button>
                                            <span className="mx-2">{quantity || (p.quantity ? p.quantity : 1)}</span>
                                            <button onClick={() => handleOnIncrement(p._id)} className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg font-semibold">${p.price}</p>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="flex flex-col lg:flex-row">
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
                            </div> */}
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
                                            <div onClick={() => navigate('/dashboard/user/profile')} className='flex justify-between items-center gap-5' ><span  ><IoAddCircle /></span>Add Address</div>
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
                    </div>
                    <div className="bg-white w-full md:w-[75%] mx-auto mt-4 dark:bg-zinc-800 shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">The total amount of</h2>
                        <div id="dropin-container"></div>
                        {/* {clientToken ? (
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
                        ) : <span>Loading payment options...</span>} */}
                        <button
                            disabled={!instance || !auth?.user?.address}
                            onClick={handlePayment}
                            className="bg-blue-500 text-white w-full py-2 rounded-md mb-4">
                            {loading ? '..Processing' : 'Make Payment'}
                        </button>

                    </div>
                </div> :
                    <div>
                        <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-foreground">Shopping Cart</h2>
                            <div className="flex flex-col items-center mt-4">
                                {/* <img src="/images/cart.png" alt="cartimage " /> */}
                                <img aria-hidden="true" alt="empty-cart-illustration" src="https://openui.fly.dev/openui/150x150.svg?text=🛒" />
                                <p className="mt-4 text-xl font-medium text-muted-foreground">Unfortunately, Your Cart is Empty</p>
                                <p className="text-sm text-muted-foreground">Please Add Somethings in your Cart</p>
                            </div>
                            <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Continue Shopping</button>
                        </div>

                    </div>
                }
            </div>


        </Layout>
    )
}

export default Cart
