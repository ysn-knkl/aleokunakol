import React, { useState } from 'react'
import Link from "next/link";
import MobileMenu from '../MobileMenu/MobileMenu'
import Logo from '/public/images/logo.png'
import Image from 'next/image';


const Header3 = (props) => {

    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
    }


    return (
        <header className="absolute md:relative left-0 top-0 w-full z-[111]">
            <div>
                <div className="wraper bg-[#272c3f] pt-[5px] px-[10px] relative before:absolute before:w-full before:h-[1px] before:bg-[rgba(255,255,255,.07)] before:bottom-0 before:left-0 before:content-['']">
                    <div className="grid grid-cols-12">
                        <div className="col-span-10 md:col-span-12">
                            <ul className="text-left md:text-center">
                                <li className=" text-white inline-block p-[15px]  col:pr-0 pl-0 col:pb-[0]"><i className="fa fa-map-marker pr-[10px] col:pt-[0] text-[#cbbc99] text-[20px]" aria-hidden="true"></i>121 King Street, Melbourne , Australia</li>
                                <li className="relative text-white inline-block p-[15px]  col:pr-0
                        before:absolute before:content-[''] before:left-0 before:top-[15px] before:w-[1px] before:h-[25px] before:bg-[rgba(255,255,255,.07)]  before:z-10 before:transform before:-translate-x-1/2 md:before:hidden">
                                    <i className="fa fa-mobile pr-[10px] text-[#cbbc99] text-[20px]" aria-hidden="true"></i>3164-5456854</li>
                                <li className="relative text-white inline-block p-[15px] col:pr-0  before:absolute before:content-[''] before:left-0 before:top-[15px] before:w-[1px] before:h-[25px] before:bg-[rgba(255,255,255,.07)] md:before:hidden  before:z-10 before:transform before:-translate-x-1/2 "><i className="fa fa-clock-o pr-[10px] text-[#cbbc99] text-[20px]" aria-hidden="true"></i>9AM - PM</li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-12">
                            <div className="text-right md:text-center md:mb-[15px]">
                                <a href="contact.html" className="theme-btn md:text-[14px] md:py-[8px] md:px-[22px]">Free Consulting</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="wraper bg-[#272c3f] px-[10px]">
                    <div className="flex items-center justify-between ">
                        <MobileMenu />
                        <div className="logo w-[255px] md:w-[200px] md:mx-auto sm:w-[180px] col:w-[160px]">
                            <Link className="text-[45px] col:text-[25px] font-bold flex items-center text-white" href="/">
                                <Image className="w-full" src={Logo} alt="" /></Link>
                        </div>
                        <ul className="md:hidden mr-[-50px] lg-[-10px]">
                            <li className="relative inline-block group">
                                <Link onClick={ClickHandler} href="/" className="relative text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white hover:text-[#c0b596] block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                                ">Home</Link>
                                <ul className="absolute w-[240px]  left-0 top-[110%] p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17]  transition-all  opacity-0 invisible
                                  group-hover:opacity-100  group-hover:top-full group-hover:visible">
                                    <li>
                                        <Link onClick={ClickHandler} href="/home" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase hover:text-[#c0b596] group relative overflow-hidden font-normal transition-all 
                                        ">Home style one</Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/home-2" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Home style Two</Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/home-3" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Home style three</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative inline-block">
                                <Link onClick={ClickHandler} href="/about" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                               ">About</Link>
                            </li>
                            <li className="relative inline-block group">
                                <Link onClick={ClickHandler} href="/" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                              ">Practice Area</Link>
                                <ul className="absolute w-[240px]  left-0 top-[110%] p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17]  transition-all  opacity-0 invisible group-hover:opacity-100  group-hover:top-full group-hover:visible">
                                    <li>
                                        <Link onClick={ClickHandler} href="/practice" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Practice areas</Link>
                                    </li>

                                    <li>
                                        <Link onClick={ClickHandler} href="/practice-single/Family-Law" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Practice areas single</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative inline-block group">
                                <Link onClick={ClickHandler} href="/" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                                ">Casec</Link>
                                <ul className="absolute w-[240px]  left-0 top-[110%] p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17]  transition-all  opacity-0 invisible group-hover:opacity-100  group-hover:top-full group-hover:visible">
                                    <li>
                                        <Link onClick={ClickHandler} href="/case-stadies" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Cases</Link>
                                    </li>

                                    <li>
                                        <Link onClick={ClickHandler} href="/case-single/Business-Accounting" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Case single</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative inline-block group">
                                <Link onClick={ClickHandler} href="/" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                               ">News</Link>
                                <ul className="absolute w-[240px]  left-0 top-[110%] p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17]  transition-all  opacity-0 invisible group-hover:opacity-100  group-hover:top-full group-hover:visible">
                                    <li>
                                        <Link onClick={ClickHandler} href="/blog" className="text-[15px] lg:text-[14px] uppercase inline-block py-[5px] text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Blog right sidebar</Link>
                                    </li>

                                    <li>
                                        <Link onClick={ClickHandler} href="/blog-left-sidebar" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Blog left sidebar</Link>
                                    </li>

                                    <li>
                                        <Link onClick={ClickHandler} href="/blog-fullwidth" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Blog fullwidth</Link>
                                    </li>

                                    <li className="relative group/group-2">
                                        <Link onClick={ClickHandler} href="/" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Blog details</Link>
                                        <ul className="absolute w-[240px]  left-[120%] xl:left-[0] xl:right-[120%] top-0 p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17] opacity-0 invisible  transition-all group-hover/group-2:opacity-100  group-hover/group-2:left-[110%] xl:group-hover/group-2:left-[auto] xl:group-hover/group-2:right-[110%] group-hover/group-2:visible">
                                            <li>
                                                <Link onClick={ClickHandler} href="/blog-single/Who-Can-a-Victim-Sue-after-a-Car-Accident" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                                ">Blog details right sidebar</Link>
                                            </li>

                                            <li>
                                                <Link onClick={ClickHandler} href="/blog-single-left-sidebar/Who-Can-a-Victim-Sue-after-a-Car-Accident" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                                ">Blog details left sidebar</Link>
                                            </li>

                                            <li>
                                                <Link onClick={ClickHandler} href="/blog-single-fullwidth/Who-Can-a-Victim-Sue-after-a-Car-Accident" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                                ">Blog details fullwidth</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative inline-block group">
                                <Link onClick={ClickHandler} href="/" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                              ">Pages</Link>
                                <ul className="absolute w-[240px]  left-0 top-[110%] p-[20px] z-[111]  bg-[#fff] shadow-[#3e419f17]  transition-all  opacity-0 invisible group-hover:opacity-100  group-hover:top-full group-hover:visible">
                                    <li>
                                        <Link onClick={ClickHandler} href="/Attorneys" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Attorneys</Link>
                                    </li>

                                    <li>
                                        <Link onClick={ClickHandler} href="/attorneys-single/Willam-Stephen" className="text-[15px] lg:text-[14px] inline-block py-[5px] uppercase text-[#333] group relative overflow-hidden font-normal transition-all hover:text-[#c0b596] 
                                        ">Attorney Single</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="relative inline-block">
                                <Link onClick={ClickHandler} href="/contact" className="relative group text-[15px] lg:text-[14px] py-[35px] xl:py-[30px] px-[18px] xl:px-[6px] text-white block uppercase font-base-font font-normal hover:text-[#c0b596] transition-all
                               ">Contact</Link>
                            </li>
                        </ul>
                        <div className="text-right relative before:absolute before:w-[1px] before:h-full py-[37px]  pl-[30px] pr-[7px] lg:pl-[20px]
                 before:bg-[rgba(255,255,255,.07)] before:bottom-0 before:left-0 before:content-[''] ">
                            <ul>
                                <li className="relative header-search-form-wrapper">
                                    <div className="cart-search-contact text-right text-white border-left cursor-pointer border-[rgba(255,255,255,.07)]">
                                        <div className="search-toggle-btn" onClick={() => setMenuState(!menuActive)}>
                                            <i className={`fi ti-search ${menuActive ? "ti-close" : "fi "}`}></i>
                                        </div>
                                    </div>
                                    <ul className={`header-search-form absolute right-0 top-[300%] w-[263px] bg-white z-20 p-[15px]  transform text-center transition-all opacity-0 invisible  ${menuActive ? "header-search-content-toggle" : ""}`}>
                                        <li>
                                            <form action="search" className="relative" onSubmit={SubmitHandler}>
                                                <input className="bg-white w-full h-[40px] pl-[10px] pr-[40px] focus-visible:outline-0 border border-[rgba(64,59,59,0.07)]" type="text" placeholder="search here.." />
                                                <button className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#272c3f] text-white border-0"><i className="fa fa-search "></i></button>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header3;