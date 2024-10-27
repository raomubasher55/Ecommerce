import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { useCategory } from '../../context/CategoryContext';
import { useNavigate } from 'react-router-dom'


const CategorySlider = () => {
    const { categories } = useCategory();
    const navigate = useNavigate();

    return (
        <>
            <div className="carousel my-12 mx-auto ">
                <h1 className='text-center text-4xl font-mono font-extrabold mb-6' >
                    SHOP BY POPULAR CATEGORY
                </h1>
                <div className="relative  px-4 py-10 hover:cursor-grab bg-slate-50 overflow-hidden">
                    <div className="swiper-container">
                        <Swiper
                            className=''
                            slidesPerView={2} // Display 4 slides at a time
                            slidesPerGroup={4} // Slide 4 items at a time
                            spaceBetween={10} // Add spacing between slides
                            loop={true} // Enable continuous looping
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false
                            }}
                       
                            pagination={{ clickable: true }} // Enable clickable pagination dots
                            modules={[Navigation, Pagination]} // Include both Navigation and Pagination modules
                        >
                            {categories.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        onClick={() => navigate(`/category/${item.slug}`)}
                                        className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md "
                                    >
                                        <div className="w-full h-48 overflow-hidden">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-[100%] h-[100%] object-contain p-6 rounded-t-md transgender transition-transform transform hover:scale-[1.1]"
                                            />
                                        </div>
                                        <p className="text-lg font-bold text-slate-700 mt-2 text-center">
                                            {item.name}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategorySlider
