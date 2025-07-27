import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import abImg from '/public/images/about/1.jpg'
import Link from "next/link";
import Image from 'next/image';

const About2 = (props) => {

    const [isOpen, setOpen] = useState(false)


    return (
        <section className="pt-[120px] pb-[100px] md:py-[80px]">
            <div className="wraper">
                <div className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-6 md:col-span-12">
                        <div className="mb-[20px]">
                            <div className="text-left sm:text-center">
                                <span className="text-[16px] text-[#ada282]">We Are Expert</span>
                                <h2 className="text-[36px] md:text-[26px] font-medium text-[#333] pb-[20px] relative 
                        before:absolute before:content-[''] before:left-[-68px] 
                        before:top-[30px] before:transform before:-translate-y-1/2 
                        before:w-[60px] before:h-[1px] before:bg-[#c0b596] md:before:hidden">Why You Need Us</h2>
                            </div>
                            <p className="text-[#666] text-[15px] leading-[28px] mb-[30px]">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at ,</p>
                            <p className="text-[#666] text-[15px] leading-[28px] mb-[30px]"> and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum</p>
                            <div className="mb-[50px] col:mb-[20px]">
                                <Link href="/about" className="bg-[#c0b596] cursor-pointer text-[16px] font-semibold text-white px-[38px] py-[10px]  capitalize inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
                        col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] 
                        ">More About Us..</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-12">
                        <div className="relative mb-[20px]">
                            <div className="relative  max-w-[520px] ml-auto before:absolute before:bg-[#c0b596]
                     before:w-full before:h-full before:content-[''] before:-z-30 before:right-[-10px] before:bottom-[-10px] ">
                                <div className="relative after:absolute after:bg-[rgba(21,26,48,.40)] after:content-[''] 
                        after:z-30 after:w-full after:h-full after:left-0 after:top-0">
                                    <Image className="w-full" src={abImg} alt="" />
                                    <div className="absolute left-0 top-0 w-full h-full transition-all ease-in-out flex justify-center flex-col text-center z-[99]">
                                        <ul>
                                            <li>
                                                <span onClick={() => setOpen(true)} className="video-btn cursor-pointer" data-type="iframe">
                                                    <i className="fa fa-play border border-white p-[20px] rounded-full text-white"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7Jv48RQ_2gk" onClose={() => setOpen(false)} />
        </section>
    )
}

export default About2;