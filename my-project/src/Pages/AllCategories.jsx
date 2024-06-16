import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../hooks/useCategory'

const AllCategories = () => {
    const categories = useCategory();

  return (
    <Layout title='All Categories'>
      <h1 className='p-32 font-bold text-3xl'>All Categories</h1>
    </Layout>
  )
}

export default AllCategories
