
import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useProduct } from '../../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom';
import AdminProductCard from '../../Components/AdminProductCard';
import { TiThMenu } from 'react-icons/ti';
import ResponsiveAdminMenu from '../../Components/Layout/ResponsiveAdminMenu';

const Products = () => {
    const { products, images } = useProduct();
    const [adminMenu, setAdminMenu] = useState(false);

    const navigate = useNavigate();

    const toggleAdminMenu = (status) => {
        setAdminMenu(status);
      };


    return (
        <Layout>
            <div className="pt-20 grid grid-cols-5 gap-4 ">
                <div className="md:col-span-1 none md:block">
                    <AdminMenu />
                </div>
                {adminMenu && <ResponsiveAdminMenu toggleAdminMenu={toggleAdminMenu} />}
                <div className="md:col-span-4 col-span-5">
                    <div className='flex justify-between w-full ' >
                        <div className='block  md:hidden  pt-9 pl-3' onClick={()=>toggleAdminMenu(true)}  ><TiThMenu className='text-xl' /></div>
                        <h1 className="pt-8 pl-3 text-2xl font-bold mb-4 mx-12 ">Products</h1>
                        <div className="text-xl font-bold mb-4 pt-8 pl-3 "> </div>
                    </div>
                    <div className='flex flex-wrap gap-5 md:justify-start justify-center'>
                        {products.map((product, index) => (
                            <AdminProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
