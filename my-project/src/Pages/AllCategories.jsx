import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { useNavigate } from 'react-router-dom';

const AllCategories = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title='All Categories'>
      <div className='pt-16 '>
        <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4">All Categories</h2>
          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
            {categories.map((category, index) => (
              <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a onClick={() => navigate(`/category/${category.slug}`)} className="cursor-pointer">
                  <img
                    className="rounded-t-lg mx-auto p-3 transition-transform transform hover:scale-[1.1] transgender h-40 object-cover "
                    src={category.image ? category.image : 'https://placehold.co/150x150?text=📱'}
                    alt={`${category.name} category`}
                  />
                </a>
                <div className="p-5">
                  <div onClick={() => navigate(`/category/${category.slug}`)} className="cursor-pointer">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                  </div>
                  
                  <div
                    onClick={() => navigate(`/category/${category.slug}`)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                  >
                    View Products
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </div>
                </div>
              </div>

            ))}
          </div>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>


      </div>
    </Layout>
  )
}

export default AllCategories
