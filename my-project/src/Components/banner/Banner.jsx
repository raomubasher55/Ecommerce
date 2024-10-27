import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Scrollbar } from 'swiper/modules';

import { MdStars } from "react-icons/md";

const Banner = () => {
  return (
    <>
      <div className='pt-'>
            <Swiper
                scrollbar={{
                    hide: true
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Scrollbar]}
                className='mySwiper bg-green-50'
            >
                <SwiperSlide>
                    <div className=" w-full bg-image1 ">
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className=" w-full bg-image2 ">
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className=" w-full bg-image3 ">
                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className=" w-full bg-image4 ">
                    </div>
                </SwiperSlide>

                {/* <SwiperSlide>
                    <div className=" w-full bg-image5 ">
                    </div>
                </SwiperSlide> */}

            </Swiper>
        </div>
    </>
  )
}

export default Banner
