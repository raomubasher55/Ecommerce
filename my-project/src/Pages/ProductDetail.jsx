import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useProduct } from '../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { singleProduct, relatedProducts, images } = useProduct();
    const [quantity, setQuantity] = useState(null);
    const { cart, setCart } = useCart();
    const navigate = useNavigate();

    //increment handle
    const handleOnIncrement = ()=>{
        singleProduct.quantity = singleProduct.quantity + 1;
        setQuantity( quantity + 1 );

    }
    
    //decrement handle
    const handleOnDecrement = ()=>{
        if(singleProduct.quantity > 1){
            singleProduct.quantity = singleProduct.quantity -1;
            setQuantity( quantity - 1 );
        }
    }
    return (
        <Layout>
            <div className='pt-24 w-full' >
                <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Product Detail</h2>
                <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg w-full shadow-lg mx-auto">
                    <div className="flex flex-col md:flex-row items-center w-full mb-6   p-4">
                        <img src={singleProduct.image ? `/${singleProduct.image}` : 'https://placehold.co/300x300'} alt="Product Image" className="w-full md:w-64 h-64 rounded-lg object-cover border border-border mb-4 md:mb-0 md:mr-6" />
                        <div className="flex flex-col w-full">
                            <h3 className="text-xl font-semibold text-foreground mb-2">{singleProduct.name}</h3>

                            <p className="text-muted-foreground mb-4">{singleProduct.description}</p>

                            <span className="text-lg font-bold text-primary mb-4">${singleProduct.price}</span>
                            <div className="flex items-center mb-4">
                                <label htmlFor="quantity" className="text-foreground mr-2">Quantity:</label>
                                <div className="flex items-center space-x-2">
                                    <button onClick={handleOnDecrement} className="border px-2">-</button>
                                    <input  onChange={(e) => setQuantity(e.target.value)} id="quantity" name="quantity" value={quantity || (singleProduct.quantity ? singleProduct.quantity : 1)} className="border text-center w-12" />
                                    <button onClick={handleOnIncrement} className="border px-2">+</button>
                                </div>
                                {/* <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="w-16 p-2 border border-input rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <button onClick={() => navigate('/')} className="bg-slate-100 text-destructive-foreground hover:bg-slate-200 px-4 py-2 rounded-lg mr-4">Cancel</button>
                        <button onClick={() => {
                            setCart([...cart, singleProduct]);
                            localStorage.setItem('cart', JSON.stringify([...cart, singleProduct]))
                            toast.success('Product add to cart Successfully', {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            })
                        }} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Add to Cart</button>
                    </div>
                </div>




                <div className='Related Products mt-4 px-4 '>
                    <h1 className='text-3xl font-bold'>Related Products</h1>
                    <hr />
                    <div className='flex mt-6'>
                        {relatedProducts && relatedProducts.length > 0 ? (
                            relatedProducts.map((product, index) => (
                                <div key={index} to={`/dashboard/admin/product/${product.slug}`}>
                                    <div className="w-[90%] my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <img
                                            className="p-8 rounded-t-lg"
                                            src={`/${images[product._id]}`}
                                            alt="product image"
                                            onError={(e) => {
                                                e.target.src = '/pics/card_placeholder.jpg';
                                                e.target.alt = 'Product Image';
                                            }}
                                        />
                                        <div className="px-5 pb-5">
                                            <div className='flex jsu'>
                                                <span href="#">
                                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                                </span>
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                            </div>
                                            <div className="flex items-center mt-2.5 mb-5">
                                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </div>
                                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <button onClick={() => navigate(`/product/${product.slug}`)} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More Detail</button>
                                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className=' text-lg text-center '>No Related Products</div>
                        )}
                    </div>

                </div>



                <div className='text-center font-bold mt-20 text-2xl' >Rating</div>
                <form action="https://formspree.io/f/mzzprvlr" method="POST" className="flex flex-col justify-center mx-auto w-[70%] mt-8">
                    <div className="flex flex-wrap-mx-3 flex-col md:flex-row w-full mb-6 mx-auto justify-center ">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="name"  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Name</label>
                            <input type="text" name='name' className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" placeholder="Enter Your Name" required />
                        </div>  
                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
                            <input type="email" name='email'  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" placeholder="Email" required />
                        </div>
                    </div>
                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                        <label htmlFor="review" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Review Title</label>
                        <input type="text" name='title'  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="review" placeholder="Enter Your Review Subject" required />
                    </div>
                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                        <label htmlFor="review" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Your Testimonial</label>
                        <textarea name='testimonial' className="resize-y appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Write Your Testimonial Here" id="exampleFormControlTextarea1" rows={6} required defaultValue={""} />
                    </div>
                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit Your Review
                        </button>
                    </div>
                </form>
            </div>


        </Layout>
    )
}

export default ProductDetail


         {/* <div className="flex flex-col md:flex-row  p-4">
                    <div className="flex-1">
                        <img src={singleProduct.image ? `/${singleProduct.image}` : 'https://placehold.co/300x300'} alt="Apple Watch" className="w-full md:w-1/2 mx-auto" />
                    </div>
                    <div className="flex-1 p-4">
                        <h1 className="text-2xl font-bold">{singleProduct.name}</h1>
                        <div className="text-zinc-500 line-through">$459.00</div>
                        <div className="text-red-500">55% Off</div>
                        <div className="text-3xl font-bold">${singleProduct.price}</div>
                        <div className="flex space-x-2 my-4">
                            <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
                            <div className="w-6 h-6 bg-pink-200 rounded-full"></div>
                            <div className="w-6 h-6 bg-zinc-200 rounded-full"></div>
                        </div>
                        <div className="my-4">
                            <div className="flex justify-between items-center">
                                <label className="font-bold">Select Size</label>
                                <a href="#" className="text-sm text-zinc-500">Size Chart</a>
                            </div>
                            <div className="text-zinc-700">Sheer Straight Kurta</div>
                            <div className="flex space-x-2 my-2">
                                <button className="border rounded-full w-8 h-8">s</button>
                                <button className="border rounded-full w-8 h-8">m</button>
                                <button className="border rounded-full w-8 h-8">l</button>
                                <button className="border rounded-full w-8 h-8">xl</button>
                            </div>
                        </div>
                        <div className="my-4">
                            <label className="font-bold">Quantity</label>
                            <div className="flex items-center space-x-2">
                                <button className="border px-2">-</button>
                                <div type="" className="border text-center w-12" >{singleProduct.quantity}</div>
                                <button className="border px-2">+</button>
                            </div>
                        </div>
                        <div className="flex space-x-2 my-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded">ADD TO CART</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">BUY NOW</button>
                        </div>
                        <div className="border-t border-zinc-300 pt-4">
                            <h2 className="font-bold">Time Reminder</h2>
                            <div className="p-4 mt-2 flex space-x-2 text-center">
                                <div className="bg-zinc-100 p-2 rounded">
                                    <span className="block text-2xl font-bold">25</span>
                                    <span className="text-sm">Days</span>
                                </div>
                                <span className="text-2xl font-bold">:</span>
                                <div className="bg-zinc-100 p-2 rounded">
                                    <span className="block text-2xl font-bold">22</span>
                                    <span className="text-sm">Hrs</span>
                                </div>
                                <span className="text-2xl font-bold">:</span>
                                <div className="bg-zinc-100 p-2 rounded">
                                    <span className="block text-2xl font-bold">13</span>
                                    <span className="text-sm">Min</span>
                                </div>
                                <span className="text-2xl font-bold">:</span>
                                <div className="bg-zinc-100 p-2 rounded">
                                    <span className="block text-2xl font-bold">57</span>
                                    <span className="text-sm">Sec</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='specification' >
                    <div className="p-4 space-y-4">
                        <div>
                            <h2 className="font-bold">Product Details</h2>
                            <p>{singleProduct.description}</p>
                        </div>
                        <div className="border-t border-zinc-300 pt-4">
                            <h2 className="font-bold">Share It</h2>
                            <button className="border border-zinc-300 py-2 px-4 mt-2">Add To WishList</button>
                        </div>


                    </div>
                    <div className="border-t border-zinc-300 px-10 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-bold">Fabric</h3>
                                <p>Chiffon</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Length</h3>
                                <p>50 Inches</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Color</h3>
                                <p>Red</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Size</h3>
                                <p>S, M, L, XXL</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Material</h3>
                                <p>Crepe printed</p>
                            </div>
                        </div>
                    </div>
                </div> */}