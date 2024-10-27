import React from 'react'
import Layout from '../Layout/Layout'
import ProductCard from '../ProductCard'
import { useProduct } from '../../context/ProductContext'

const AllProducts = () => {
  const {productsList} = useProduct();
  console.log(productsList);
  return (
    <Layout>
      <div className="p-32">
        {productsList?.map((product , index)=>(
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </Layout>
  )
}

export default AllProducts
