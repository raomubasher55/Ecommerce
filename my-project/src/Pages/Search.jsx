import React, { useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../context/SearchContext'
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../Components/ProductCard';

const Search = () => {
  const { value, setValue } = useSearch();
  const { images, } = useProduct();
  const navigate = useNavigate();


  return (
    <Layout title='Search Result'>
      <div className="container inline-block mt-20">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{value?.results.lenght < 1 ?
            'No Product Found' :
            `Found ${value?.results.length}`}
          </h6>
        </div>
        {value?.results.length >= 1 ?
          <div className='flex     flex-wrap gap-4 justify-evenly xl:justify-start  w-full p-4'>
            {value.results.map((product, index) => (
              //  <div key={index} className="w-[90%] my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              //    <img
              //      className="p-8 rounded-t-lg"
              //      src={`/${images[product._id]}`}
              //      alt="product image"

              //      onError={(e) => {
              //        e.target.src = '/pics/card_placeholder.jpg';
              //        e.target.alt = 'Product Image';
              //      }}
              //    />
              //    <div className="px-5 pb-5">
              //      <div className='flex jsu'>
              //        <span href="#">
              //          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
              //        </span>
              //        <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              //      </div>
              //      <div className="flex items-center mt-2.5 mb-5">
              //        <div className="flex items-center space-x-1 rtl:space-x-reverse">
              //          <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              //            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //          </svg>
              //          <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              //            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //          </svg>
              //          <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              //            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //          </svg>
              //          <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              //            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //          </svg>
              //          <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              //            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              //          </svg>
              //        </div>
              //        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
              //      </div>
              //      <div className="flex items-center justify-between">
              //        <button onClick={() => navigate(`/product/${product.slug}`)} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
              //        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More Detail</button>
              //      </div>
              //    </div>
              //  </div>
              <ProductCard key={index} product={product} />
            ))}
          </div>
          :
          <div>
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md ml-84">
              <h2 className="text-lg font-semibold text-foreground">No Products Found</h2>
              <div className="flex flex-col items-center mt-6 w-full">
                {/* <img aria-hidden="true" alt="no-products" src="https://placehold.co/150x150?text=🔍" /> */}
                <FaSearch className='text-3xl' />
                <h3 className="mt-4 text-lg font-medium text-foreground">Oops!</h3>
                <p className="text-sm text-muted-foreground">We couldn't find any products matching your search.</p>
              </div>
              <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg">Go Back</button>
            </div>
          </div>
        }

      </div>
    </Layout>
  )
}

export default Search
