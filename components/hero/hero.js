import React from "react";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";


const Hero = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <section className="hero relative h-[790px] lg:h-[500px] col:h-[450px] overflow-hidden z-20">
            <div className="hero-slider">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    speed={1800}
                    parallax={true}
                    navigation
                >
                    <SwiperSlide>
                        <div className="slide-inner slide-bg-image h-[790px] lg:h-[500px] col:h-[450px]" style={{ backgroundImage: `url(${'/images/slider/slide-4.jpg'})` }}>
                            <div className="slide  relative h-full bg-cover bg-no-repeat z-10  after:absolute after:content-[''] 
            after:w-full after:h-full after:left-0 after:top-0 after:opacity-70 after:z-10">
                                <div className="wraper">
                                    <div className="slide-caption w-[700px] mt-[245px] lg:mt-[110px] md:mt-[120px] col:mt-[100px] absolute top-0 z-20">
                                        <p className="text-white text-[20px] font-light col:text-[18px]">The Most Talented Law Frim</p>
                                        <h2 className="text-white text-[60px] leading-[90px] lg:text-[42px] lg:leading-[56px] 
                     col:text-[25px] col:leading-[35px] font-normal my-[33px] md:my-[20px]"><span>We Fight For Your Justice</span> <br /> <span>As Like A Friend.</span></h2>
                                        <div className="btns">
                                            <div className="btn-style">
                                                <Link onClick={ClickHandler} href="/contact" className="bg-[#c0b596] relative cursor-pointer text-[16px]
                             font-semibold text-white px-[38px] py-[12px]  capitalize inline-block mt-[6px] 
                             transition ease-in-out duration-300 hover:bg-[#d4c291]
                            col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] 
                            before:absolute before:content-[''] before:w-[85px] before:h-[2px] before:left-[-60px]
                             before:top-[50%]  before:bg-white before:transform before:translate-y-[-50%] 
                             before:transition-all hover:before:left-[-95px] md:before:hidden">Contact us now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner slide-bg-image h-[790px] lg:h-[500px] col:h-[450px]" style={{ backgroundImage: `url(${'/images/slider/slide-5.jpg'})` }}>
                            <div className="slide  relative h-full bg-cover bg-no-repeat z-10  after:absolute after:content-[''] 
            after:w-full after:h-full after:left-0 after:top-0 after:opacity-70 after:z-10">
                                <div className="wraper">
                                    <div className="slide-caption w-[700px] mt-[245px] lg:mt-[110px] md:mt-[120px] col:mt-[100px] absolute top-0 z-20">
                                        <p className="text-white text-[20px] font-light col:text-[18px]">The Most Talented Law Frim</p>
                                        <h2 className="text-white text-[60px] leading-[90px] lg:text-[42px] lg:leading-[56px] 
                     col:text-[25px] col:leading-[35px] font-normal my-[33px] md:my-[20px]"><span>We Fight For Your Justice</span> <br /> <span>As Like A Friend.</span></h2>
                                        <div className="btns">
                                            <div className="btn-style">
                                                <Link onClick={ClickHandler} href="/contact" className="bg-[#c0b596] relative cursor-pointer text-[16px]
                             font-semibold text-white px-[38px] py-[12px]  capitalize inline-block mt-[6px] 
                             transition ease-in-out duration-300 hover:bg-[#d4c291]
                            col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] 
                            before:absolute before:content-[''] before:w-[85px] before:h-[2px] before:left-[-60px]
                             before:top-[50%]  before:bg-white before:transform before:translate-y-[-50%] 
                             before:transition-all hover:before:left-[-95px] md:before:hidden">Contact us now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ...
                </Swiper>
            </div>
        </section>
    )
}

export default Hero;