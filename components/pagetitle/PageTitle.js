import React from 'react'
import Link from "next/link";

const PageTitle = (props) => {
    return (
        <section className="page-title min-h-[550px] sm:min-h-[300px] relative flex justify-start  items-center
         z-30  bg-no-repeat bg-center bg-cover text-left" style={{ backgroundImage: `url(${'/images/breadcumb/1.jpg'})` }}>
            <div className="wraper">
                <div className="w-[100%] ml-auto text-left pt-[130px] md:pt-[0] sm:pt-[0]">
                    <h2 className="text-[60px]  text-white leading-[60px] mt-[-10px] mb-[20px] font-black sm:text-[30px] sm:leading-[35px] sm:mb-[10px]">{props.pageTitle}</h2>
                    <ol className="pl-0 mb-0 text-left">
                        <li className="inline-block py-0 px-[5px] text-white relative  text-[18px] font-base-font md:text-[18px] after:content-['/'] after:absolute after:right-[-5px]">
                            <Link className="text-white  transition-all hover:text-[#cbbc99]" href="/">Home</Link>
                        </li>
                        <li className="inline-block  px-[5px] text-[#cbbc99] text-[18px] font-base-font md:text-[18px]">{props.pagesub}</li>
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default PageTitle;