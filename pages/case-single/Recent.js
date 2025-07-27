import React from 'react';
import Cases from '../../api/case';
import Link from 'next/link'
import Image from 'next/image';

const RecentCase = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <div className="mt-[40px] order-3 md:order-2">
            <h2 className="text-[36px] md:text-[25px] text-[#282e3f] pb-[20px] mb-[60px] relative 
   before:absolute before:left-0 before:bottom-0 before:content-[''] 
   before:w-[60px] before:h-[2px] before:bg-[#cbbc99]">Related Case Studies</h2>
            <div className="grid grid-cols-12 gap-3">
                {Cases.slice(0, 3).map((cases, i) => (
                    <div className="col-span-4 md:col-span-6 col:col-span-12" key={i}>
                        <div className="relative group md:mb-[30px]">
                            <div className="studies-single">
                                <Image className="w-full" src={cases.cImg} alt="" />
                            </div>
                            <div className="absolute bottom-[-80px] bg-[#151a30cc] w-[calc(100%)] h-[calc(100%)] transition ease-in-out duration-500 opacity-0 invisible 
                        group-hover:opacity-100 group-hover:visible group-hover:bottom-0">
                                <div className="absolute left-[5%] top-[5%] w-[90%] h-[90%] text-center border-[2px] border-[#c0b596] z-10 flex justify-center flex-col">
                                    <p className="text-[#c0b596] text-[16px] leading-[28px]">{cases.sub}</p>
                                    <h3 className="relative text-white text-[22px] pt-[10px] pb-[25px] font-medium 
                             before:absolute before:left-[50%] before:top-full before:content-[''] before:bg-[#c0b596] before:transform before:-translate-x-1/2
                             before:w-[60px] before:h-[3px] before:z-10">
                                        <Link onClick={ClickHandler} href="/case-single/[slug]" as={`/case-single/${cases.slug}`} className="text-white transition ease-in-out duration-300 hover:text-[#c0b596]">{cases.cTitle}</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
};
export default RecentCase;

