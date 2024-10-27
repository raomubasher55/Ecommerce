import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/AuthContext'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useProduct } from '../../context/ProductContext'
import { Select } from 'antd'
import CreateNewProduct from '../../Components/Form/CreateNewProduct'
import ResponsiveAdminMenu from '../../Components/Layout/ResponsiveAdminMenu'
const {Option} = Select

const CreateProduct = () => {
    const [credentials, setCredentials] = useState({});
    const [adminMenu, setAdminMenu] = useState(false);
    const [categories, setCategories] = useState([])
    const {products , CreateProduct} = useProduct();
    
    
    const toggleAdminMenu = (status) => {
        setAdminMenu(status);
      };


    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className="pt-20  grid grid-cols-5 gap-4 ">
                <div className="md:col-span-1 none md:block">
                    <AdminMenu />
                </div>
                {adminMenu && <ResponsiveAdminMenu toggleAdminMenu={toggleAdminMenu} />}
                <div className="md:col-span-4 col-span-5    ">
                    <div className='w-full'>
                        <CreateNewProduct toggleAdminMenu={toggleAdminMenu} />
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
