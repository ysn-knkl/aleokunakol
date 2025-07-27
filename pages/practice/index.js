import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import Practice3 from '../../components/Practice3/Practice3';
import Navbar2 from '../../components/Navbar2/Navbar2';
import Features2 from '../../components/Features2/Features2';
import Testimonial from '../../components/Testimonial/Testimonial';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Pricing from '../../components/Pricing/Pricing';

const PracticePage =() => {

    return(
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={'Practice Area'} pagesub={'Practice'}/> 
            <Features2 />
            <Practice3 />
            <Testimonial tClass={'pt-[100px] sm:pt-[20px]'}/>
            <Pricing />
            <Newsletter />
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default PracticePage;

