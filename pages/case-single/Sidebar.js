import React from 'react';
import Practices from '../../api/Practices';
import Cases from '../../api/case';
import Link from 'next/link'
import Image from 'next/image';

const Sidebar = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="col-span-4 md:col-span-6 sm:col-span-8 col:col-span-12 order-2 md:order-3">
            <div className="pl-[40px] lg:pl-0 md:mt-[40px]">
                <form>
                    <div className="relative">
                        <input type="text" className="form-control w-full text-[16px] border border-[#ddd] h-[50px]  pl-[10px] focus:outline-0 focus:shadow-none  text-[#D8D8D8]" placeholder="Search Post.." />
                        <button type="submit" className="text-[20px] text-white  bg-[#282e3f] absolute right-0 top-[52%] h-[50px]
              leading-[50px] w-[50px]  transform -translate-y-1/2">
                            <i className="ti-search"></i>
                        </button>
                    </div>
                </form>
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
                                <li className="border-b border-[#ddd]" key={Pitem}><Link onClick={ClickHandler} href='/practice-single/[slug]'as={`/practice-single/${practice.slug}`} className="text-[15px] pt-[15px] pb-[10px] text-[#333] block transition-all ease-in-out hover:text-[#c0b596]">{practice.sTitle}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-[65px] pt-[15px] px-[30px] pb-[20px] bg-[#f5f5f5]">
                    <h3 className="text-[25px] relative text-[#282e3f] text-left capitalize pb-[20px] font-medium
        ">Recent Case</h3>
                    <div className="mt-[10px]">
                        {Cases.slice(0, 3).map((cases, i) => (
                            <div className="overflow-hidden flex" key={i}>
                                <div className="w-[90px]">
                                    <Image className="w-full" src={cases.cImg} alt="" />
                                </div>
                                <div className="pl-[20px] w-[calc(100%-90px)]">
                                    <h4><Link onClick={ClickHandler} href="/case-single/[slug]" as={`/case-single/${cases.slug}`}  className="inline-block font-base-font font-medium
                     text-[#666] transition-all hover:text-[#c0b596]">Actual {cases.cTitle} of the great explorer of,</Link>
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Sidebar;

