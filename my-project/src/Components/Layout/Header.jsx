import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';
import { Badge } from 'antd';
import SearchResult from '../Form/SearchResult';
import ResponsiveHeader from './ResponsiveHeader';
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const categories = useCategory();
  const cart = useCart();
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const accountRef = useRef(null);
  const [header, setHeader] = useState(false)

  const [isCategoriesDropdownVisible, setCategoriesDropdownVisible] = useState(false);
  const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const handleOnLogout = () => {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth')
  }

  const toggleCategoriesDropdown = () => {
    setCategoriesDropdownVisible(!isCategoriesDropdownVisible);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownVisible(!isAccountDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setCategoriesDropdownVisible(false);
    }
    if (accountRef.current && !accountRef.current.contains(event.target)) {
      setAccountDropdownVisible(false);
    }
    if (header && !event.target.closest('.fixed.inset-0')) {
      setHeader(false);
    }
  };

  const toogleOnHeader = () => {
    setHeader(!header)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <nav className="flex flex-row  md:flex-row items-center justify-between py-4 px-2  md:px-12 border-b border-border fixed bg-white w-full z-10">
          <div>
            <div className="md:text-3xl text-md font-bold mb-4 md:mb-0 md:mr-4">CoveCart</div>
          </div>
          <div>
            <SearchInput />
            {/* <SearchResult/> */}
          </div>
          <div className="flex items-center space-x-4">
            <div onClick={toogleOnHeader} className="flex items-center md:hidden">
              {header ? <button id="menu-toggle" className="block text-primary hover:text-primary ">
                <IoCloseSharp className='text-2xl' />
              </button> :
                <button id="menu-toggle" className="block text-primary hover:text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>}
            </div>
            <div className="hidden md:flex items-center font-semibold space-x-12">
              <Link to="/" className="hover:text-primary">Home</Link>
              <div ref={categoryRef} className="relative category">
                <button
                  id="mega-menu-dropdown-button"
                  onClick={toggleCategoriesDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Categories
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isCategoriesDropdownVisible && (
                  <div id="mega-menu-dropdown" className="absolute z-10  w-64  text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                        {categories.slice(0, 3).map((category, index) => (
                          <li key={index}>
                            <Link to={`/category/${category.slug}`} className="text-gray-500   dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                              {category.name}
                            </Link>
                          </li>
                        ))}
                        <button onClick={() => navigate('/categories')} className='btn bg-blue-600 rounded-md px-3 py-1 text-white hover:bg-blue-700' >More...</button>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <Badge count={cart?.cart?.length}>
                <Link to="/cart" className="block py-2 px-4 hover:bg-gray-200 text-md">Cart</Link>
              </Badge>
              <div ref={accountRef} className="relative">
                <button
                  id="dropdownDelayButton"
                  onClick={toggleAccountDropdown}
                  className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  My Account
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {isAccountDropdownVisible && (
                  <div id="dropdownDelay" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                      <li>
                        <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user/profile'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                      </li>
                      <li>
                        <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin/orders' : 'user/orders'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</Link>
                      </li>
                      <li>
                        <Link to={`/dashboard/${auth?.user?.role === 1 ? '' : 'wishlist'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Wishlist</Link>
                      </li>
                      <li>
                        <Link onClick={handleOnLogout} to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {header &&
          <div className='md:hidden '>
            <ResponsiveHeader setHeader={setHeader} />
          </div>
        }
      </div>
    </>
  );
}

export default Header;





// <header className="fixed w-full z-30 bg-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         <Link to="index.html" className="text-2xl font-bold"><img src="/logo.png" className='mx-auto md:w-11 md:h-11 lg:w-15 lg:h-15 w-10 h-10' alt="" /></Link>
//         <input className="hidden" type="checkbox" id="menu-btn" />
//         <label className="block cursor-pointer lg:hidden" htmlFor="menu-btn">
//           <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
//           <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
//           <span className="bg-gray-800 block h-0.5 w-6 my-1"></span>
//         </label>
//         <SearchInput />
//         <ul className="flex flex-row  lg:flex space-x-6 list-none text-lg font-semibold">
//           <li><Link to="/" className="block py-2 px-4 hover:bg-gray-200">Home</Link></li>
//           <li><Link to="/about" className="block py-2 px-4 hover:bg-gray-200">About Us</Link></li>
//           {!auth.user ?
//             (<>
//               <li><Link to="/Login" className="block py-2 px-4 hover:bg-gray-200">Login</Link></li>
//               <li><Link to="/signup" className="block py-2 px-4 hover:bg-gray-200">Signup</Link></li>
//             </>)
//             :
//             (<>
//               <li onClick={handleOnLogout}  ><Link to="/login" className="block py-2 px-4 hover:bg-gray-200">Logout</Link></li>

//             </>)}


//           <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{auth?.user?.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
//           </svg>
//           </button>
//           <div>
//             <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
//               Categories <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
//               </svg>
//             </button>
//             <div id="mega-menu-dropdown" className="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
//               <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
//                 <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
//                   <li  >
//                     <Link to={`/categories`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
//                       All Categories
//                     </Link>
//                   </li>
//                   {categories.map((category, index) => (
//                     <li key={index} >
//                       <Link to={`/category/${category.slug}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
//                         {category.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
//               <li>
//                 <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
//               </li>
//               <li>
//                 <Link onClick={handleOnLogout} to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout </Link>
//               </li>
//               <li>
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
//               </li>
//               <li>
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
//               </li>
//             </ul>
//           </div>

//           <Badge count={cart?.cart?.length}>
//             <li><Link to="/cart" className="block py-2 px-4 hover:bg-gray-200">Cart </Link></li>
//           </Badge>
//         </ul>
//       </div>
//     </header> 