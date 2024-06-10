import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <ToastContainer />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
