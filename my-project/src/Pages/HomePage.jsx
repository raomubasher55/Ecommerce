import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/AuthContext'
import { useProduct } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd'; // Ensure correct import
import { useCategory } from '../context/CategoryContext';
import { Price } from '../Components/Price';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { FaPlus } from "react-icons/fa6";
import ProductCard from '../Components/ProductCard';
import Banner from '../Components/banner/Banner';
import { FaListUl } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import CategorySlider from '../Components/CategorySlider/CategorySlider';
import Testimonial from '../Components/testimonial/Testimonial';



const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const { categories } = useCategory();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { images, filterProducts, total, productsList, ListOfProductFuntion, loadMore } = useProduct();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [sidebar, setSidebar] = useState(false);


  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  };

  const toogleOnSidebar = () => {
    setSidebar(!sidebar)
  }

  useEffect(() => {
    if (checked.length || radio.length) filterProducts(checked, radio)
  }, [checked, radio])

  useEffect(() => {
    if (page === 1) {
      ListOfProductFuntion(page);
    }
    loadMore(page);
  }, [page]);

  return (
    <Layout>
      <div className="inline-block mt-20 w-full">
        <Banner />
        <div className=''><CategorySlider /> </div>

        <div className="filter ml-8 mt-2">
          {!sidebar ? (
            <FaListUl
              className="text-[20px] cursor-pointer"
              onClick={toogleOnSidebar}
            />
          ) : (
            <IoClose
              className="text-[20px] cursor-pointer"
              onClick={toogleOnSidebar}
            />
          )}
        </div>

        <div className="heading text-4xl font-extrabold font-mono text-center">Trending</div>
        <div className="flex flex-col md:flex-row p-4 gap-5  ">
          {/* Sidebar */}
          {sidebar && (
            <div className="w-full xl:w-[200px]  md:w-[180px] ml-3 pr-6 p-4 Shadow">
              <div className="font-bold text-sm mb-2">Filter By Category</div>
              <div className="flex flex-col space-y-2">
                {categories.map((category, index) => (
                  <Checkbox
                    key={index}
                    onChange={(e) => handleFilter(e.target.checked, category._id)}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </div>
              <h2 className="font-bold text-sm mt-4 mb-2">Filter By Price</h2>
              <div className="flex flex-col space-y-2">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Price?.map((p, index) => (
                    <div key={index}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  onClick={() => window.location.reload()}
                  className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset Filter
                </span>
              </div>
            </div>

          )}
          {/* Main Content */}
          <div className="flex flex-wrap gap-4 justify-evenly xl:justify-start  w-full ">
            {productsList.slice(0, 8).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            {productsList.length < total && (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Testimonial />
    </Layout>
  )
}

export default HomePage 
