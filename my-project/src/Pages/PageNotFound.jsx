import React from 'react'

const PageNotFound = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-900 ">
                <div className="relative w-1/2 mx-16">
                    <div className="flex justify-center items-center bg-pink-600 rounded-xl w-1/2 h-[20vw] md:h-[150px] md:w-[150px] shadow-lg transform rotate-[-21deg]">
                        <h1 className="text-5xl text-gray-900 transform -translate-z-20 select-none">404</h1>
                    </div>
                </div>
                <div className="ml-8 flex flex-col justify-center text-white mx-16 ">
                    <h4 className="text-2xl">Oops! Page not found</h4>
                    <p className="mt-2">The page you are looking for does not exist. Go back to the main page or search.</p>
                    <a href="../../index.html" className="btn mt-4 hover:text-gray-900 hover:bg-gray-100">Back to Home</a>
                    <input type="search" name="search" id="search_box" placeholder="Search" className="mt-4 w-3/4 md:w-full px-4 py-2 border border-gray-500 rounded-md bg-opacity-50 focus:outline-none focus:border-gray-300" />
                </div>
            </div>
        </>
    )
}

export default PageNotFound
