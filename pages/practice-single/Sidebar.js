import React from 'react';
import pImg from '/public/images/practice/2.jpg'
import Practices from '../../api/Practices';
import Link from 'next/link'
import Image from 'next/image';

const Sidebar = () => {
    
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-span-4 md:col-span-6 sm:col-span-8  col:col-span-12  order-1 md:order-2">
            <div className="pr-[40px] lg:pr-0 md:mt-[40px]">
                <div className="relative z-10 before:z-10 before:absolute before:contnent-[''] before:bg-[rgba(0,0,0,.65)] before:top-0 before:left-0 before:w-full before:h-full ">
                    <Image className="w-full" src={pImg} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center flex-col text-center px-[40px] pb-[20px] z-20">
                        <h3 className="text-[36px] text-white leading-[55px] pb-[25px]">
                            <span className="text-[60px]">25</span>Years of Experience In This Field</h3>
                        <div className="btn-style">
                            <Link className=" bg-[#c0b596] cursor-pointer text-[16px] font-semibold text-white px-[38px] py-[10px]  
                      capitalize inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
                      col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] " href="/contact">Contact Us Now</Link>
                        </div>
                    </div>
                </div>
                <div className="bg-[#f5f5f5] mt-[60px]">
                    <div className="bg-[#ddd] py-[10px] px-[20px] relative  
                  before:z-10 before:absolute before:contnent-[''] before:border-[15px] before:border-transparent 
                  before:border-t-[13px] before:border-t-[rgba(0,0,0,.1)]
                   before:top-full before:left-[30px] ">
                        <h3 className="text-[24px] text-[#282e3f]">Category</h3>
                    </div>
                    <div className="pt-[15px] px-[30px] pb-[20px]">
                        <ul>
                            {Practices.map((practice, Pitem) => (
                                <li className="border-b border-[#ddd]" key={Pitem}><Link onClick={ClickHandler} href='/practice-single/[slug]' as={`/practice-single/${practice.slug}`} className="text-[15px] pt-[15px] pb-[10px] text-[#333] block transition-all ease-in-out hover:text-[#c0b596]">{practice.sTitle}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Sidebar;

