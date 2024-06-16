import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useProduct } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd'; // Ensure correct import
import { useCategory } from '../context/CategoryContext';
import { Price } from '../Components/Price';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const { categories } = useCategory();
  const {cart , setCart} = useCart();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { images, filterProducts, total, productsList, ListOfProductFuntion, loadMore } = useProduct();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);


  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts(checked, radio)
  }, [checked, radio])

  useEffect(() => {
    if (page === 1) {
      ListOfProductFuntion(page);
    }
    loadMore(page);
  }, [page]);



  // <pre>{JSON.stringify(auth , null , 2)} </pre>
  return (
    <Layout>
      <div className='inline-block mt-20 w-full '>
        <div className=' grid grid-cols-3 gap-4'>
          <div className=' ml-5 col-span-1'>
            <h2 className='font-bold text-2xl'>Filter By Category</h2>
            <div className="flex flex-col">
              {categories.map((category, index) => (
                <Checkbox key={index} onChange={(e) => { handleFilter(e.target.checked, category._id) }} >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <h2 className='font-bold text-2xl'>Filter By Price</h2>
            <div className="flex flex-col">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Price?.map((p, index) => (
                  <div key={index}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span onClick={() => window.location.reload()} className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reset Filter</span>
            </div>
          </div>
          <div className='col-span-2'>
            {/* {JSON.stringify(radio, null, 4)} */}
            <h1 className='font-bold text-2xl text-center mb-10'>All Products</h1>
            <div className='grid grid-cols-3'>
              {productsList.map((product, index) => (
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
                      <button onClick={()=> navigate(`/product/${product.slug}`)}  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More Detail</button>
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={()=>{
                        setCart([...cart ,product]);
                        localStorage.setItem('cart' , JSON.stringify([...cart , product]))
                        toast.success('Product add to cart Successfully',{
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",                          })
                      }}
                    
                      >Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>{(productsList.length < total) && (
              <div className="flex items-center justify-between">
                <button onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More</button>
              </div>
            )}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage 
