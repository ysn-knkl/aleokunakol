import React, { Fragment } from 'react';
import Navbar2 from '../../components/Navbar2/Navbar2';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Practices from '../../api/Practices';
import Sidebar from './Sidebar';
import Newsletter from '../../components/Newsletter/Newsletter';
import pImg from '/public/images/practice/4.jpg'
import { useRouter } from 'next/router'
import Image from 'next/image';

const PracticeSinglePage =(props) => {
    const router = useRouter()

    const PracticeDetails = Practices.find(item => item.slug === router.query.slug)


    return(
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={PracticeDetails?.sTitle} pagesub={'Practice'} />
            <div className="py-[100px] md:py-[80px]">
                <div className="wraper">
                    <div className="grid grid-cols-12 gap-3">
                        <Sidebar />
                        <div className="col-span-8 md:col-span-12 order-2 md:order-1">
                            <Image className="w-full" src={PracticeDetails?.sImg} alt="" />
                            <div className="pt-[50px]">
                                <h2 className="text-[36px] text-[#282e3f] mb-[25px]">{PracticeDetails?.sTitle}</h2>
                                <h5 className="text-[22px] font-base-font leading-[40px] text-[#282e3f] mb-[25px]">I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born </h5>
                                <p className="text-[16px] leading-[30px] py-[20px] mb-[16px]">I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, </p>
                                <p className="text-[16px] leading-[30px] mb-[25px]">because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? </p>
                            </div>
                            <div className="mt-[40px]">
                                <div className="float-left col:float-none mr-[30px] col:mr-0 col:mb-[30px] w-[30%] col:w-full">
                                    <img src={pImg} alt="" />
                                </div>
                                <div className="organigation-text float-left w-[64%] col:float-none  col:w-full">
                                    <h2 className="text-[24px] text-[#282e3f] mb-[8px] block">{PracticeDetails?.sTitle} Organizations</h2>
                                    <span className="block pt-[15px] text-[15px] text-[#333]"><i className="fa fa-check-square-o text-[#c0b596] pr-[15px]" aria-hidden="true"></i>The master-builder of human happiness.</span>
                                    <span className="block pt-[15px] text-[15px] text-[#333]"><i className="fa fa-check-square-o text-[#c0b596] pr-[15px]" aria-hidden="true"></i>Occasionally circumstances occur in which toil and pain</span>
                                    <span className="block pt-[15px] text-[15px] text-[#333]"><i className="fa fa-check-square-o text-[#c0b596] pr-[15px]" aria-hidden="true"></i>Avoids pleasure itself, because it is pleasure</span>
                                    <span className="block pt-[15px] text-[15px] text-[#333]"><i className="fa fa-check-square-o text-[#c0b596] pr-[15px]" aria-hidden="true"></i>who do not know how to pursue pleasure</span>
                                    <span className="block pt-[15px] text-[15px] text-[#333]"><i className="fa fa-check-square-o text-[#c0b596] pr-[15px]" aria-hidden="true"></i>To take a trivial example, which of us ever undertakes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default PracticeSinglePage;
