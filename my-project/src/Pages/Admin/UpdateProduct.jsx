import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import ProductUpdateForm from '../../Components/Form/ProductUpdateForm'

const UpdateProduct = () => {

    return (
        <div>
            <Layout title={'Dashboard - Create Product'}>
                <div className="pt-20 px-6 grid grid-cols-3 gap-4 ">
                    <div className="col-span-1">
                        <AdminMenu />
                    </div>
                    <div className="col-span-2">
                        <div className='w-full'>
                            <ProductUpdateForm />
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UpdateProduct
