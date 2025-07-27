import React from 'react'
import Link from "next/link";
import about from '/public/images/about/2.jpg'
import sign from '/public/images/about/1.png'
import Image from 'next/image';


const About = (props) => {
    
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="pt-[120px] pb-[100px]">
           <div className="wraper">
               <div className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-6 md:col-span-12">
                        <div className="relative mb-[20px]">
                            <div className=" relative max-w-[520px] before:absolute before:bg-[#c0b596] before:w-full before:h-full before:content-[''] before:-z-10 before:left-[-20px] before:top-[-20px] ">
                              <Image className="w-full" src={about} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-12">
                        <div className="mb-[20px]">
                            <h2 className="text-[#282e3f] text-[32px]">About Us</h2>
                            <p className="text-[#666] text-[15px] leading-[28px] mb-[30px]">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at ,</p>
                            <p className="text-[#666] text-[15px] leading-[28px] mb-[30px]"> and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum</p>
                            <div className="mb-[50px] col:mb-[20px]">
                                <Link onClick={ClickHandler} href="/about" className="bg-[#c0b596] cursor-pointer text-[16px] font-semibold text-white px-[38px] py-[10px]  capitalize inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
                                col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] 
                                ">More About Us..</Link>
                            </div>
                            <div className="signature">
                                <Image  src={sign} alt=""/>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
        </section>
    )
}

export default About;