import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import blogs from '../../api/blogs'
import Link from 'next/link'
import Navbar2 from '../../components/Navbar2/Navbar2';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Image from 'next/image';
import blog3 from '/public/images/blog-details/comments-author/img-1.jpg'
import blog4 from '/public/images/blog-details/comments-author/img-2.jpg'
import blog5 from '/public/images/blog-details/comments-author/img-3.jpg'
import blog6 from '/public/images/blog-details/author.jpg'
import blog7 from '/public/images/blog-details/2.jpg'
import blog8 from '/public/images/blog-details/3.jpg'
import Footer from '../../components/footer/Footer';


const submitHandler = (e) => {
    e.preventDefault()
}

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogSingle = (props) => {
    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)


    return (
        <Fragment>
            <Navbar2/>
            <PageTitle pageTitle={BlogDetails?.title} pagesub={'Blog'} />
            <section className="py-[120px] md:py-[90px] sm:py-[80px]">
                <div className="wraper">
                    <div className='grid-cols-12 grid gap-3'>
                        <div className={`col-span-12 md:col-span-12 ${props.blRight}`}>
                            <div className="">
                                <div className="mb-[70px]">
                                    <Image className="w-full" src={BlogDetails?.blogSingleImg} alt="" />
                                    <div className="overflow-hidden my-[35px]">
                                        <ul>
                                            <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666]"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-user"></i> By <Link onClick={ClickHandler} className="text-[#666] transition-all hover:text-[#c0b596]" href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles">Jenny Watson</Link> </li>
                                            <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[2px] before:h-[15px]  before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#ccc] z-10 before:-z-10"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-comment-white-oval-bubble"></i> Comments 35 </li>
                                            <li className="text-[14px] font-medium uppercase float-left col:float-none col:block col:ml-[0px] col:mb-[5px] text-[#666] ml-[20px] pl-[20px] relative before:absolute before:left-0 before:top-[50%] before:w-[2px] before:h-[15px]  before:content-[''] before:translate before:-translate-y-1/2 before:bg-[#ccc] z-10 before:-z-10"><i className="relative top-0 mr-[3px] text-[15px] text-[#666]  fi flaticon-calendar-1"></i> 24 Jun 2023</li>
                                        </ul>
                                    </div>
                                    <h3 className="text-[34px] md:text-[25px] sm:text-[22px] text-[#282e3f] font-normal font-heading-font leading-[40px] transition-all mb-[20px] group"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="group-hover:text-[#c0b596] transition-all">{BlogDetails?.title}</Link></h3>
                                    <p className="text-[#666] leading-[30px] text-[16px] mb-[20px]">I will give you a complete account of the system,
                                        and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
                                        No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,
                                        but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>

                                    <blockquote className="relative bg-[#e4e0d4] text-[#333] text-[19px] p-[65px] mt-[60px] mb-[40px] text-center font-semibold leading-[35px] sm:px-[25px] sm:py-[55px]
                          before:font-['FontAwesome'] before:content-['\f10e'] before:text-[20px] before:absolute before:left-1/2 before:top-[-30px] before:translate before:-translate-x-1/2 before:w-[60px] before:h-[60px] before:leading-[60px]
                           before:border-[2px] before:border-[#eae7e7] before:bg-[#ddd5d5] before:text-[#333] before:rounded-full">

                                        Those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
                                    </blockquote>
                                    <p className="text-[#666] leading-[30px] text-[16px] mb-[20px]">I will give you a complete account of the system,
                                        and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
                                        No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,
                                        but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
                                    <div className="overflow-hidden mt-[40px] mx-[-7.5px]">
                                        <div className="w-[calc(50%-15px)] float-left mx-[7.5px] mb-[15px]">
                                            <Image className="w-full" src={blog7} alt="" />
                                        </div>
                                        <div className="w-[calc(50%-15px)] float-left mx-[7.5px] mb-[15px]">
                                            <Image className="w-full" src={blog8} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-[#d8e0f1] mt-[75px] pb-[30px] text-white sm:mb-[40px]">
                                    <div className="flex items-center">
                                        <span className="font-base-font text-[#666] font-semibold inline-block pr-[15px] uppercase">Share: </span>
                                        <ul className="inline-block">
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[13px] px-[18px] py-[5px] text-[#333] bg-[#f5f5f5]  font-semibold transition-all hover:text-[#c0b596]">Business</Link></li>
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[13px] px-[18px] py-[5px] text-[#333] bg-[#f5f5f5]  font-semibold transition-all hover:text-[#c0b596]">Corporate</Link></li>
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[13px] px-[18px] py-[5px] text-[#333] bg-[#f5f5f5]  font-semibold transition-all hover:text-[#c0b596]">Law</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-[30px] pb-[30px] text-white sm:mb-[40px]">
                                    <div className="flex items-center">
                                        <span className="font-base-font text-[#333] font-semibold inline-block pr-[15px] uppercase">Share: </span>
                                        <ul className="inline-block">
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[15px] capitalize text-[#333] underline font-semibold transition-all hover:text-[#c0b596]">facebook</Link></li>
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[15px] capitalize text-[#333] underline font-semibold transition-all hover:text-[#c0b596]">twitter</Link></li>
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[15px] capitalize text-[#333] underline font-semibold transition-all hover:text-[#c0b596]">linkedin</Link></li>
                                            <li className="float-left ml-[10px] sm:m-[2px] sm:ml-0"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block text-[15px] capitalize text-[#333] underline font-semibold transition-all hover:text-[#c0b596]">pinterest</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-[35px] mb-[60px]">
                                    <div className="float-left sm:float-none">
                                        <Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" target="_blank">
                                            <Image className="rounded-[50%]" src={blog6} alt="" /></Link>
                                    </div>
                                    <div className="block overflow-hidden pl-[25px] sm:pl-0 sm:mt-[15px]">
                                        <Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="font-base-font text-[24px] font-semibold inline-block mb-[10px] text-[#333]">Author: Jenny Watson</Link>
                                        <p className="text-[#666] leading-[24px] text-[16px] mb-[20px]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                            veritatis.</p>
                                        <ul className="inline-block list-none">
                                            <li className="float-left mr-[12px]"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="block text-[13px] text-[#333] transition-all hover:text-[#c0b596]"><i className="ti-facebook"></i></Link></li>
                                            <li className="float-left mr-[12px]"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="block text-[13px] text-[#333] transition-all hover:text-[#c0b596]"><i className="ti-twitter-alt"></i></Link></li>
                                            <li className="float-left mr-[12px]"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="block text-[13px] text-[#333] transition-all hover:text-[#c0b596]"><i className="ti-linkedin"></i></Link></li>
                                            <li className="float-left mr-[12px]"><Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="block text-[13px] text-[#333] transition-all hover:text-[#c0b596]"><i className="ti-instagram"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="overflow-hidden border border-[#d8e0f1] px-[25px]">
                                    <div className="py-[40px] pr-[15px] pl-[5px] sm:py-[25px] sm:px-[15px] w-[50%] float-left sm:w-full sm:float-none text-left group">
                                        <Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block">
                                            <span className="pl-[25px] sm:pl-0 tracking-[2px] text-[15px] relative transition-all group-hover:text-[#c0b596] text-[#333] uppercase  font-semibold block
                               before:font-['themify'] before:content-['\e629'] before:transition-all  before:absolute before:left-0 before:top-0 sm:before:hidden group-hover:before:text-[#c0b596] 
                               ">Previous Post</span>
                                            <span className="font-base-font text-[18px] font-medium text-[#666] mt-[15px] block">At vero eos et accusamus et iusto odio dignissimos
                                                ducimus qui blanditiis praesentium.</span>
                                        </Link>
                                    </div>
                                    <div className="py-[40px] pl-[15px] pr-[5px] sm:py-[25px] sm:px-[15px] w-[50%] float-left sm:w-full sm:float-none text-right sm:text-left  group border-l border-[#d8e0f1] sm:border-l-transparent sm:border-t">

                                        <Link onClick={ClickHandler} href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles" className="inline-block transition-all group">
                                            <span className="pr-[25px] sm:pr-0 tracking-[2px] text-[15px] relative transition-all group-hover:text-[#c0b596] text-[#333] uppercase   font-semibold block
                                before:font-['themify'] before:content-['\e628'] before:transition-all  before:absolute before:left-[95%] before:top-0 sm:before:hidden group-hover:before:text-[#c0b596] ">Next Post</span>
                                            <span className="font-base-font text-[18px] font-medium text-[#666] mt-[15px] block">Dignissimos ducimus qui blanditiis praesentiu deleniti
                                                atque corrupti quos dolores</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-[70px]">
                                    <h3 className="text-[30px] md:text-[25px] sm:text-[20px] uppercase tracking-[3px] text-[#282e3f] font-medium font-heading-font leading-[40px] mb-[20px]">5 Comments</h3>
                                    <ol className="pl-0">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1" className="relative border-b border-[#d8e0f1] p-[30px] md:px-[25px] md:py-[35px]">
                                                <div className="absolute left-[35px] sm:static">
                                                    <div className="comment-image">
                                                        <Image className="rounded-full" src={blog3} alt="" />
                                                    </div>
                                                </div>
                                                <div className="pl-[100px] sm:pl-0 sm:pt-[25px]">
                                                    <div className="comment-wrapper">
                                                        <h4 className="text-[18px]  capitalize  text-[#333] font-bold font-base-font  mb-[15px]">Robert Sonny <span className="text-[15px]  capitalize  text-[#666] font-normal  pl-[5px] sm:pl-0">says Jul 21, 2023 at 10:00am</span></h4>
                                                        <p className="text-[15px]  capitalize  text-[#666] font-normal mb-[20px]">I must explain to you how all this mistaken idea of
                                                            denouncing pleasure and praising pain was born and I
                                                            will give you a complete account of the system</p>
                                                        <Link onClick={ClickHandler} className="text-[14px]  font-base-font text-[#333] font-semibold inline-block underline uppercase tracking-[1px] transition-all hover:text-[#c0b596]" href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles"><span>Reply</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="pl-[30px]">
                                                <li className="comment">
                                                    <div className="relative border-b border-[#d8e0f1] p-[30px] md:px-[25px] md:py-[35px]">
                                                        <div className="absolute left-[35px] sm:static">
                                                            <div className="comment-image">
                                                                <Image className="rounded-full" src={blog4} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="pl-[100px] sm:pl-0 sm:pt-[25px]">
                                                            <div className="comment-wrapper">
                                                                <h4 className="text-[18px]  capitalize  text-[#333] font-bold font-base-font  mb-[15px]">John Abraham <span className="text-[15px]  capitalize  text-[#666] font-normal  pl-[5px] sm:pl-0">says Jul 21, 2023 at 10:00am</span></h4>
                                                                <p className="text-[15px]  capitalize  text-[#666] font-normal mb-[20px]">I must explain to you how all this mistaken idea of
                                                                    denouncing pleasure and praising pain was born and I
                                                                    will give you a complete account of the system</p>
                                                                <Link onClick={ClickHandler} className="text-[14px]  font-base-font text-[#333] font-semibold inline-block underline uppercase tracking-[1px] transition-all hover:text-[#c0b596]" href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles"><span>Reply</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul className="pl-[30px]">
                                                        <li className="comment">
                                                            <div className="relative border-b border-[#d8e0f1] p-[30px] md:px-[25px] md:py-[35px]">
                                                                <div className="absolute left-[35px] sm:static">
                                                                    <div className="comment-image">
                                                                        <Image className="rounded-full" src={blog5} alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className="pl-[100px] sm:pl-0 sm:pt-[25px]">
                                                                    <div className="comment-wrapper">
                                                                        <h4 className="text-[18px]  capitalize  text-[#333] font-bold font-base-font  mb-[15px]">Robert Sonny<span className="text-[15px]  capitalize  text-[#666] font-normal  pl-[5px] sm:pl-0">says Jul 21,
                                                                            2023 at 10:00am</span></h4>
                                                                        <p className="text-[15px]  capitalize  text-[#666] font-normal mb-[20px]">I must explain to you how all this mistaken idea of
                                                                            denouncing pleasure and praising pain was born and I
                                                                            will give you a complete account of the system</p>
                                                                        <Link onClick={ClickHandler} className="text-[14px]  font-base-font text-[#333] font-semibold inline-block underline uppercase tracking-[1px] transition-all hover:text-[#c0b596]" href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles"><span>Reply</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="comment">
                                            <div className="relative p-[30px] md:px-[25px] md:py-[35px]">
                                                <div className="absolute left-[35px] sm:static">
                                                    <div className="comment-image">
                                                        <Image className="rounded-full" src={blog3} alt="" />
                                                    </div>
                                                </div>
                                                <div className="pl-[100px] sm:pl-0 sm:pt-[25px]">
                                                    <div className="comment-wrapper">
                                                        <h4 className="text-[18px]  capitalize  text-[#333] font-bold font-base-font  mb-[15px]">Robert Sonny <span className="text-[15px]  capitalize  text-[#666] font-normal  pl-[5px] sm:pl-0">says Jul 21, 2023 at 10:00am</span></h4>
                                                        <p className="text-[15px]  capitalize  text-[#666] font-normal mb-[20px]">I must explain to you how all this mistaken idea of
                                                            denouncing pleasure and praising pain was born and I
                                                            will give you a complete account of the system</p>
                                                        <Link onClick={ClickHandler} className="text-[14px]  font-base-font text-[#333] font-semibold inline-block underline uppercase tracking-[1px] transition-all hover:text-[#c0b596]" href="/blog-single/Car-Accidents-Caused-by-Defective-Vehicles"><span>Reply</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                    <div className="mt-[40px]">
                                        <div className="mb-[30px]">
                                            <h2 className="font-medium uppercase  tracking-[2px] text-[#333] text-[22px] leading-[130.5%] trant md:text-[25px]">Leave a reply</h2>
                                        </div>
                                        <form method="post" className="contact-validation-active" id="contact-form-main" onSubmit={submitHandler}>
                                            <div className="grid grid-cols-12 gap-3">
                                                <div className="col-span-6 md:col-span-6 sm:col-span-12 mb-3">
                                                    <input type="text" className="form-control w-full rounded-[30px] h-[50px] pl-[15px] focus:outline-0 focus:shadow-none bg-transparent border border-[#ddd] text-[#666]" placeholder="Your Name" />
                                                </div>
                                                <div className="col-span-6 md:col-span-6 sm:col-span-12 mb-3">
                                                    <input type="email" className="form-control w-full rounded-[30px] h-[50px] pl-[15px] focus:outline-0 focus:shadow-none bg-transparent border border-[#ddd] text-[#666]" placeholder="Your Email" />
                                                </div>
                                                <div className="col-span-12 mb-3">
                                                    <input type="url" className="form-control w-full rounded-[30px] h-[50px] pl-[15px] focus:outline-0 focus:shadow-none bg-transparent border border-[#ddd] text-[#666]" placeholder="Website" />
                                                </div>
                                                <div className="col-span-12">
                                                    <textarea className="form-control w-full h-[220px] rounded-[30px] pl-[15px] pt-[10px] focus:outline-0 focus:shadow-none bg-transparent border border-[#ddd] text-[#666]" name="note" id="note" placeholder="Write Your Comments..."></textarea>
                                                </div>
                                            </div>
                                            <div className="mt-[10px]">
                                                <button type="submit" className="bg-[#c0b596] cursor-pointer text-[16px] font-semibold text-white px-[38px] py-[10px]  uppercase inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
                                  col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px]  rounded-[30px] tracking-[2px]">Post Comment</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogSingle;
