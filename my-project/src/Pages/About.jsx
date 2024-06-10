import React from 'react';
import Layout from '../Components/Layout/Layout';

const AboutSection = () => {
    return (
        <Layout>
            <section className="relative py-32">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        {/* Content Column */}
                        <div className="content-column w-full md:w-1/2 mb-10 md:mb-0">
                            <div className="inner-column pt-12 md:pr-24">
                                <div className="sec-title mb-10">
                                    <div className="title text-lg text-[#d7a449] font-bold relative inline-block pb-2.5 mb-4">
                                        About Us
                                        <div className="absolute right-0 bottom-2 w-10 h-px bg-gray-400"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold leading-tight text-gray-800 mb-4">
                                        We Are The Leader In <br /> The Interiores
                                    </h2>
                                </div>
                                <div className="text text-gray-500 text-base leading-loose mb-10">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book. It has survived not only five centuries.
                                </div>
                                <div className="email text-gray-900 font-bold mb-12">
                                    Request Quote: <span className="text-[#d7a449]">freequote@gmail.com</span>
                                </div>
                                <a
                                    href="about.html"
                                    className="theme-btn btn-style-three relative text-gray-900 font-bold text-base px-10 py-2.5 bg-white border-2 border-[#d7a449] uppercase tracking-wider hover:text-white hover:bg-[#d7a449]"
                                >
                                    Read More
                                    <div
                                        className="absolute left-2.5 top-2.5 right-[-2.5] bottom-[-2.5] z-[-1] bg-repeat"
                                        style={{ backgroundImage: "url('https://i.ibb.co/DKn55Qz/pattern-1.jpg')" }}
                                    ></div>
                                </a>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="image-column w-full md:w-1/2 mb-12 md:mb-0 relative md:pl-12">
                            <div className="inner-column relative md:ml-12">
                                <div className="image relative">
                                    <img src="https://i.ibb.co/vQbkKj7/about.jpg" alt="" className="w-full block" />
                                    <div className="overlay-box absolute left-10 bottom-12">
                                        <div className="year-box relative text-gray-900 text-2xl font-bold leading-snug pl-32">
                                            <span className="number absolute left-0 top-0 w-28 h-28 text-[#d7a449] text-6xl font-bold leading-[6.5rem] text-center bg-white border border-black">
                                                5
                                            </span>
                                            Years <br /> Experience <br /> Working
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-0 top-0 left-10 bottom-24 border-2 border-[#d7a449] z-[-1]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutSection;
