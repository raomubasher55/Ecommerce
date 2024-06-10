import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout title={'Your Orders'}>
            <div className="p-20 grid grid-cols-2 gap-4">
                <div className="row-span-1">
                    <UserMenu />
                </div>
                <div className="row-span-1">
                    <div className='card' >Your  Orders</div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
