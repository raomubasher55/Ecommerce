import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartContext';
import { Badge } from 'antd';

const ResponsiveHeader = ({setHeader}) => {
    const { auth, setAuth } = useAuth();
    const categories = useCategory();
    const cart = useCart();
    const navigate = useNavigate();
    const categoryRef = useRef(null);
    const accountRef = useRef(null);
    const headerRef = useRef(null);


    const [isCategoriesDropdownVisible, setCategoriesDropdownVisible] = useState(false);
    const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);
    const [userMenu, setUserMenu] = useState(false);


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
        if(headerRef.current && ! headerRef.current.contains(event.target)){
            setHeader(false);            
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={headerRef} >
                <nav className="fixed  border-b border-border  bg-white w-[40%] right-0 top-24 min-h-screen z-10">

                    {/* <div className="flex items-center justify-center flex-col space-x-4"> */}

                    <div className=" flex flex-col items-center font-semibold space-y-12">
                        <div>
                            <Link to="/" className="hover:text-primary">Home</Link>
                        </div>
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
                                <div id="mega-menu-dropdown" className="absolute z-10 w-64 right-0 mt-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:w-64 dark:bg-gray-700">
                                    <div className="p-4 pb-0 text-gray-900 dark:text-white">
                                        <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                            <li>
                                                {/* <Link to="/categories" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
              All Categories
            </Link> */}
                                            </li>
                                            {categories.slice(0, 3).map((category, index) => (
                                                <li key={index}>
                                                    <Link to={`/category/${category.slug}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <button onClick={() => navigate('/categories')} className='btn bg-blue-600 rounded-md px-3 py-1 text-white hover:bg-blue-700'>
                                                More...
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <Badge count={cart?.cart?.length}>
                                <Link to="/cart" className="block py-2 px-4 hover:bg-gray-200 text-[17px]">Cart</Link>
                            </Badge>
                        </div>
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
                                <div id="dropdownDelay" className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700">
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
                    {/* </div> */}
                </nav>
            </div>
        </>
    )
}

export default ResponsiveHeader
