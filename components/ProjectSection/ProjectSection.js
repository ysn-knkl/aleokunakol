import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projects from '../../api/project'
import simg1 from '/public/images/project/line-1.png'
import simg2 from '/public/images/project/line-2.png'
import ProjectSingle from '../ProjectSingle/ProjectSingle';

const settings = {
    dots: false,
    arrows: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                dots: true,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: true,
                slidesToScroll: 1
            }
        }
    ]
};


const ProjectSection = (props) => {

    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }

    const [state, setState] = useState({
    })

    const handleClickOpen = (item) => {
        setOpen(true);
        setState(item)
    }
    return (
        <section className="wpo-project-area relative bg-[#191919] pt-[120px] pb-[190px] md:pb-[80px] overflow-hidden z-20" id='portfolio'>
            <div className="wraper wpo-project-wrap">
                <div className="flex md:block grid-cols-2 items-center mb-[60px] md:mb-[40px]">
                    <div className="max-w-[540px] md:text-center text-left md:m-auto md:mb-[40px] text-white">
                        <h2 className="heading-font font-bold text-5xl md:text-[35px] sm:text-[22px] mb-[15px]">Recent Work.
                        </h2>
                        <p className="base-font text-lg font-normal pr-[80px] md:pr-0">Must explain to you how all this
                            mistaken idea pleasure
                            born and give you a complete account.</p>
                    </div>
                    <div className="w-[130px] h-[130px] ml-auto rounded-full text-center text-[55px] leading-[130px] bg-[#303030] 
            relative before:absolute before:left-[-10px] before:top-[-10px] before:w-[150px]
             before:decoration-dashed before:z-10 before:h-[150px] before:border
              before:border-[#383838] before:content before:rounded-full md:m-auto ">
                        <i className="fi flaticon-self-growth text-[55px] text-[#FFE600]"></i>
                    </div>
                </div>
                <div className="wpo-project-slide owl-carousel pb-[90px] md:pb[60px]">
                    <Slider {...settings}>
                        {Projects.map((project, pro) => (
                            <div className="project-item group" key={pro}>
                                <div className="overflow-hidden">
                                    <img className="w-full transition   ease-in-out  scale-100 group-hover:scale-110"
                                        src={project.pImg} alt="" />
                                </div>
                                <div className="pt-[30px]">
                                    <h2
                                        onClick={() => handleClickOpen(project)}
                                        className="cursor-pointer leading-[35px] font-base-font font-semibold text-[25px] xl:text-[22px] md:text-[20px]">
                                        <span className="text-white transition ease-in-out hover:text-[#3faf60]"
                                        >{project.title}</span>
                                    </h2>
                                    <span className="font-normal text-[14px] leading-[18px] text-[#D8D8D8]">{project.subTitle}</span>
                                </div>
                            </div>
                        ))}
                    </Slider>


                </div>
            </div>
            <div className="absolute top-1/2 left-[30%] transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <svg className="fill-[#FFE500]" width="1325" height="1687" viewBox="0 0 1325 1687" fill="none">
                    <g filter="url(#filter0_f_39_4166)">
                        <circle cx="481.5" cy="843.5" r="343.5" fillOpacity="0.27" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4166" x="-362" y="0" width="1687" height="1687"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_39_4166" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 -z-10">
                <img src={simg1} alt="" />
            </div>
            <div className="absolute right-0 top-0 -z-10">
                <img src={simg2} alt="" />
            </div>
            <ProjectSingle open={open} onClose={handleClose} title={state.title} pImg={state.ps1img} psub1img1={state.psub1img1} psub1img2={state.psub1img2} />
        </section>
    );
}

export default ProjectSection;