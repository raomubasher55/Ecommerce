import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { RiDeleteBin6Line } from "react-icons/ri";


const AdminProductCard = ({index , product}) => {
    const { cart, setCart } = useCart();
    const navigate = useNavigate();
    const { images ,deleteProduct } = useProduct();


    return (
        <>
            <Link to={`/dashboard/admin/product/${product.slug}`} className="p-4 hover:shadow-2xl mt-4 border rounded bg-card w-[18rem] h-[24rem] flex flex-col justify-between">
                <img
                    className="p-8 rounded-t-lg"
                    src={`/${images[product._id]}`}
                    alt="product image"

                    onError={(e) => {
                        e.target.src = '/pics/card_placeholder.jpg';
                        e.target.alt = 'Product Image';
                    }}
                    
                />
                <hr />
                <div className="flex justify-between items-center">
                    <div onClick={() => navigate(`/product/${product.slug}`)} >
                        <h3 className="font-bold text-xl">{product.name}</h3>
                        <p className="font-semibold text-lg">{product.price} $</p>
                    </div>
                    {/* <button onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
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
                    }} className="p-2 bg-secondary text-secondary-foreground rounded-full bg-gray-400">
                        <FaPlus />
                    </button> */}
                    <button>
                    <RiDeleteBin6Line onClick={()=>deleteProduct(product._id)} className='text-2xl text-red-500  rounded-full ' />
                    </button>
                </div>
            </Link>
        </>
    )
}

export default AdminProductCard
