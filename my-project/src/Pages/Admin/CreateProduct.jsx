import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/AuthContext'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useProduct } from '../../context/ProductContext'
import { Select } from 'antd'
import CreateNewProduct from '../../Components/Form/CreateNewProduct'
const {Option} = Select

const CreateProduct = () => {
    const [credentials, setCredentials] = useState({});
    const [categories, setCategories] = useState([])
    const {products , CreateProduct} = useProduct();
    

    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className="pt-20 px-6 grid grid-cols-3 gap-4 ">
                <div className="col-span-1">
                    <AdminMenu />
                </div>
                <div className="col-span-2">
                    <div className='w-full'>
                        <CreateNewProduct/>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
