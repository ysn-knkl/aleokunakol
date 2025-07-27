import React from 'react';
import Link from "next/link";;
import Practices from '../../api/Practices';


const Practice2 = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <section className="relative bg-no-repeat bg-cover bg-center z-10 pt-[95px] pb-[95px] md:pb-[75px]
          before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-[rgba(21,26,48,.66)]  before:-z-10 " style={{ backgroundImage: `url(${'/images/practice/1.jpg'})` }}>
            <div className="wraper">
                <div className="col-span-12 text-center">
                    <div className="mb-[60px]">
                        <span className="text-[16px] text-[#ada282]">Area Of Practice</span>
                        <h2 className=" text-[36px] md:text-[26px] font-medium text-white pb-[20px] relative before:absolute before:content-[''] before:left-[50%] before:bottom-0 before:transform before:-translate-x-1/2 before:w-[60px] before:h-[3px] before:bg-[#c0b596]">How Can We Help You</h2>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    {Practices.map((practice, Pitem) => (
                        <div className="col-span-4 md:col-span-6 sm:col-span-12" key={Pitem}>
                            <div className="group flex items-center sm:mx-[80px] col:mx-0 bg-[rgba(192,181,150,.30)] p-[20px] lg:p-[10px]">
                                <div className="h-[80px] w-[80px]">
                                    <div className="h-[80px] w-[80px] leading-[75px] border-r border-[rgba(192,181,150,.5)]  text-center">
                                        <i className={`fi ${practice.icon}  text-[50px] col:text-[40px] col:leading-[45px] transition-all text-[#c0b596] group-hover:text-[#999]`}></i>
                                    </div>
                                </div>
                                <div className="pl-[24px]">
                                    <h3 className="text-white text-[24px] col:text-[20px] font-medium pb-[10px] relative mb-[10px]
                    before:absolute before:content-[''] before:left-0 before:bottom-0 before:w-[30px] before:h-[2px] before:bg-[#c0b596]"><Link className='transition-all hover:text-[#c0b596]' onClick={ClickHandler} href="/practice-single/[slug]" as={`/practice-single/${practice.slug}`}>{practice.sTitle}</Link></h3>
                                    <p className="text-white text-[16px] font-normal">{practice.des2}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default Practice2;