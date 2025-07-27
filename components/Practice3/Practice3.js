import React from 'react';
import Link from "next/link";;
import Practices from '../../api/Practices';


const Practice3 = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <section className="bg-[#f5f5f5] pt-[95px] pb-[70px]">
            <div className="wraper">
                <div className="col-span-12 text-center">
                    <div className="mb-[60px]">
                        <span className="text-[16px] text-[#ada282]">Area Of Practice</span>
                        <h2 className=" text-[36px] md:text-[26px] font-medium text-[#333] pb-[20px] relative before:absolute before:content-['']
             before:left-[50%] before:bottom-0 before:transform before:-translate-x-1/2 before:w-[60px] before:h-[3px]
              before:bg-[#c0b596]">How Can We Help You</h2>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-3">
                    {Practices.map((practice, Pitem) => (
                        <div className="col-span-4 md:col-span-6 sm:col-span-12 mb-5" key={Pitem}>
                            <div className="group text-center py-[40px] border border-[#c0b596]">
                                <div className="h-[80px] w-[80px] mx-auto">
                                    <div className="h-[80px] w-[80px] leading-[75px] text-center">
                                        <i className={`fi ${practice.icon}  text-[50px]  col:leading-[45px] transition-all text-[#c0b596] group-hover:text-[#999]`}></i>
                                    </div>
                                </div>
                                <div className="px-[50px]">
                                    <h3 className="text-[#373737] text-[24px] col:text-[20px] font-medium relative  pt-[24px] mb-[10px] hover:text-[#c0b596] transition-all
                    before:absolute before:content-[''] before:left-1/2 before:top-[10px] before:transform before:-translate-x-1/2 before:w-[65px] before:h-[1px] before:bg-[#c0b596]"><Link onClick={ClickHandler} href='/practice-single/[slug]' as={`/practice-single/${practice.slug}`}>{practice.sTitle}</Link></h3>
                                    <p className="text-[#777] text-[16px] font-normal">{practice.des2}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default Practice3;