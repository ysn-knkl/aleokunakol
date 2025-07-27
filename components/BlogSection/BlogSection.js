import React from 'react';
import blogs from '../../api/blogs'
import Link from "next/link";
import Image from 'next/image';

const BlogSection = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


    return (

        <section className="bg-[#f5f5f5] pt-[94px] pb-[70px]">
            <div className="wraper">
                <div className="col-span-12 text-center">
                    <div className="mb-[60px]">
                        <span className="text-[16px] text-[#ada282]">From Our Blog</span>
                        <h2 className=" text-[36px] md:text-[26px] font-medium text-[#333] pb-[20px] 
                       relative before:absolute before:content-[''] before:left-[50%] before:bottom-0 
                       before:transform before:-translate-x-1/2 before:w-[60px] before:h-[3px] before:bg-[#c0b596]">Latest News</h2>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    {blogs.map((blog, bl) => (
                        <div className="col-span-4 md:col-span-6 col:col-span-12" key={bl}>
                            <div className="mb-[30px] group">
                                <div className="transition ease-in-out duration-300">
                                    <Image className="w-full transition ease-in-out duration-300 group-hover:grayscale" src={blog.screens} alt="" />
                                </div>
                                <div className="bg-white pt-[20px] px-[20px] pb-[30px]">
                                    <h3 className="text-[24px] leading-[36px] font-heading-font font-medium mb-[20px]">
                                        <Link onClick={ClickHandler} href='/blog-single/[slug]' as={`/blog-single/${blog.slug}`} className="text-[#000] transition ease-in-out duration-300 hover:text-[#c0b596]">{blog.title}</Link>
                                    </h3>
                                    <ul className="flex items-center">
                                        <li className="text-[#c0b596]"><Image className="w-[40px] h-[40px] rounded-[50%]" src={blog.authorImg} alt="" /></li>
                                        <li className="text-[#c0b596] px-[10px]"><Link onClick={ClickHandler} href='/blog-single/[slug]' as={`/blog-single/${blog.slug}`} className="text-[#666]">{blog.author}</Link></li>
                                        <li className="text-[#c0b596] relative px-[10px] before:absolute before:content-[''] before:left-0 before:top-1/2
                                    before:w-[2px] before:h-[15px] before:bg-[#ccc] before:transform before:-translate-y-1/2"> {blog.create_at}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogSection;