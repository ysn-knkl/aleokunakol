import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import Footer from '../../components/footer/Footer';
import Cases from '../../api/case';
import Sidebar from './Sidebar';
import RecentCase from './Recent';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Image from 'next/image';


const CaseSinglePage = (props) => {

    const router = useRouter()

    const caseDetails = Cases.find(item => item.slug === router.query.slug)

    return (
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={caseDetails?.cTitle} pagesub={'Cases'} />
            <div className="py-[100px] md:py-[80px]">
                <div className="wraper">
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-8 md:col-span-12 order-1">
                            <Image className="w-full max-h-[400px] object-cover" src={caseDetails?.cImg} alt="" />
                            <div className="pt-[50px]">
                                <h2 className="text-[36px] text-[#282e3f] mb-[25px]">Family Law</h2>
                                <h5 className="text-[22px] font-base-font leading-[40px] text-[#282e3f] mb-[25px]">I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born </h5>
                                <p className="text-[16px] leading-[30px] py-[20px] mb-[16px]">I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, </p>
                                <p className="text-[16px] leading-[30px] mb-[25px]">because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? </p>
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                    <RecentCase />
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default CaseSinglePage;
