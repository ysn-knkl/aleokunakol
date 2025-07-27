import React, { Fragment } from 'react';
import Navbar2 from '../../components/Navbar2/Navbar2'
import Hero from '../../components/hero/hero';
import Features2 from '../../components/Features2/Features2';
import About2 from '../../components/about2/about2';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Practice2 from '../../components/Practice2';
import CaseStudies from '../../components/CaseStudies/CaseStudies';
import Testimonial from '../../components/Testimonial/Testimonial';
import ConsultingArea from '../../components/ConsultingArea/ConsultingArea';
import Attorney from '../../components/attorneys';
import FunFact from '../../components/FunFact';
import BlogSection from '../../components/BlogSection/BlogSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/footer/Footer';

const HomePage2 = () => {
    return (
        <Fragment>
            <Navbar2/>
            <Hero />
            <Features2 />
            <About2 /> 
            <Practice2 />
            <CaseStudies />
            <Testimonial />
            <ConsultingArea />
            <Attorney />
            <FunFact />
            <BlogSection />
            <Newsletter />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage2;