import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Attorneys from '../../api/attorneys'
import Image from 'next/image';


const settings = {
    dots: false,
    arrows: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const Attorney = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="attorney-sec relative py-[100px]">
            <div className="wraper">
                <div className="col-span-12 text-center">
                    <div className="mb-[60px]">
                        <span className="text-[16px] text-[#ada282]">Meet Our Experts</span>
                        <h2 className=" text-[36px] md:text-[26px] font-medium text-[#333] pb-[20px] relative before:absolute before:content-[''] before:left-[50%] before:bottom-0 before:transform before:-translate-x-1/2 before:w-[60px] before:h-[3px] before:bg-[#c0b596]">Qualified Attorneys</h2>
                    </div>
                </div>
                <div className="team-slider relative">
                    <Slider {...settings}>
                        {Attorneys.map((attorney, aitem) => (
                            <div className="overflow-hidden relative shadow-[1px_1px_5px_rgba(0,0,5,8%)] group" key={aitem}>
                                <div className="expert-img">
                                    <Image className="w-full" src={attorney.AtImg} alt="" />
                                </div>
                                <div className="relative text-center mt-[-40px] bg-[#f5f5f5] transform translate-y-[40px] transition ease-in-out duration-300 group-hover:translate-y-0 group-hover:bg-[#fff]">
                                    <h3 className="text-[24px] col:text-[20px] font-medium pt-[30px] pb-[8px]  font-heading-font"><Link onClick={ClickHandler} href='/attorneys-single/[slug]' as={`/attorneys-single/${attorney.slug}`} className="text-[#282e3f] hover:text-[#ada282] transition-all">{attorney.name} </Link></h3>
                                    <span className="text-[#ada282] text-[16px] font-normal">{attorney.title}</span>
                                    <ul className="flex justify-center my-[20px] transition ease-in-out">
                                        <li className="px-[10px] "><Link onClick={ClickHandler} href='/attorneys-single/[slug]' as={`/attorneys-single/${attorney.slug}`} className="text-[#c0b596] transition-all hover:text-[#999]"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                        <li className="px-[10px] "><Link onClick={ClickHandler} href='/attorneys-single/[slug]' as={`/attorneys-single/${attorney.slug}`} className="text-[#c0b596] transition-all hover:text-[#999]"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                        <li className="px-[10px] "><Link onClick={ClickHandler} href='/attorneys-single/[slug]' as={`/attorneys-single/${attorney.slug}`} className="text-[#c0b596] transition-all hover:text-[#999]"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Attorney;
