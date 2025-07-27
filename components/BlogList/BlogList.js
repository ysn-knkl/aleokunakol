import React from 'react';
import Link from "next/link";
import BlogSidebar from '../BlogSidebar'
import VideoModal from '../ModalVideo/VideoModal'

import blogs from '../../api/blogs'
import Image from 'next/image';



const BlogList = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="py-[120px] md:py-[90px] sm:py-[80px]">
            <div className="wraper">
                <div className={`${props.gClass} grid gap-3`}>
                    <div className={`col-span-8 md:col-span-12 ${props.blRight}`}>
                        {blogs.map((blog, bitem) => (
                            <div className={`post mb-[70px]  ${blog.blClass}`} key={bitem}>
                                <div className="entry-media video-holder">
                                    <Image className="w-full" src={blog.blogSingleImg} alt="" />
                                    <VideoModal />
                                </div>
                                <div className="overflow-hidden my-[35px]">
                                    <ul>
                                        <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666]"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-user"></i> By <Link onClick={ClickHandler} href='/blog-single/[slug]' as={`/blog-single/${blog.slug}`}  className="text-[#666] transition-all hover:text-[#c0b596]">{blog.author}</Link></li>
                                        <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[2px] before:h-[15px]  before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#ccc] z-10 before:-z-10"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-comment-white-oval-bubble"></i> Comments {blog.comment} </li>
                                        <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[2px] before:h-[15px]  before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#ccc] z-10 before:-z-10"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-calendar-1"></i> {blog.create_at}</li>
                                    </ul>
                                </div>
                                <h3 className="text-[34px] md:text-[25px] sm:text-[22px] text-[#282e3f] font-normal font-heading-font leading-[40px] transition-all mb-[20px] group"><Link className="group-hover:text-[#c0b596] transition-all" onClick={ClickHandler} href='/blog-single/[slug]' as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h3>
                                <p className="text-[#666] leading-[30px] text-[16px] mb-[20px]">I will give you a complete account of the system,
                                    and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
                                    No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,
                                    but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
                                <Link onClick={ClickHandler} href='/blog-single/[slug]' as={`/blog-single/${blog.slug}`} className="text-[#666] uppercase underline font-base-font text-[15px] font-semibold transition-all hover:text-[#c0b596]">READ MORE...</Link>
                            </div>
                        ))}
                    </div>
                    <BlogSidebar blLeft={props.blLeft} LeftClass={props.LeftClass}/>
                </div>
            </div>
        </section>


    )

}

export default BlogList;
