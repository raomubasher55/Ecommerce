import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';
import { Badge } from 'antd';
const Header = () => {
  const { auth, setAuth } = useAuth();
  const categories = useCategory();
  const cart = useCart();
  const handleOnLogout = () => {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth')
  }
  return (
    <>
      <div>
        <header className="fixed w-full z-30 bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            <Link to="index.html" className="text-2xl font-bold"><img src="/logo.png" className='mx-auto md:w-11 md:h-11 lg:w-15 lg:h-15 w-10 h-10' alt="" /></Link>
            <input className="hidden" type="checkbox" id="menu-btn" />
            <label className="block cursor-pointer lg:hidden" htmlFor="menu-btn">
              <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
              <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
              <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
            </label>
            <SearchInput />
            <ul className="flex flex-row  lg:flex space-x-6 list-none text-lg font-semibold">
              <li><Link to="/" className="block py-2 px-4 hover:bg-gray-200">Home</Link></li>
              <li><Link to="/about" className="block py-2 px-4 hover:bg-gray-200">About Us</Link></li>
              {!auth.user ?
                (<>
                  <li><Link to="/Login" className="block py-2 px-4 hover:bg-gray-200">Login</Link></li>
                  <li><Link to="/signup" className="block py-2 px-4 hover:bg-gray-200">Signup</Link></li>
                </>)
                :
                (<>
                  <li onClick={handleOnLogout}  ><Link to="/login" className="block py-2 px-4 hover:bg-gray-200">Logout</Link></li>

                </>)}


              <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{auth?.user?.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
              </button>
              <div>
                <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                  Categories <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div id="mega-menu-dropdown" className="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                  <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                    <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                      <li  >
                        <Link to={`/categories`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                          All Categories
                        </Link>
                      </li>
                      {categories.map((category, index) => (
                        <li key={index} >
                          <Link to={`/category/${category.slug}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                  <li>
                    <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link onClick={handleOnLogout} to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout </Link>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
              </div>

              <Badge count={cart?.cart?.length}>
                <li><Link to="/cart" className="block py-2 px-4 hover:bg-gray-200">Cart </Link></li>
              </Badge>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;