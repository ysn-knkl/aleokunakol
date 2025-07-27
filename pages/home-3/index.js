import React, { Fragment } from 'react';
import Header3 from '../../components/header3/Header3';
import Hero2 from '../../components/hero2/hero2';
import Features from '../../components/Features/Features';
import About from '../../components/about/about';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Practice3 from '../../components/Practice3/Practice3';
import CaseStudies from '../../components/CaseStudies/CaseStudies';
import Testimonial from '../../components/Testimonial/Testimonial';
import ConsultingArea from '../../components/ConsultingArea/ConsultingArea';
import Attorney from '../../components/attorneys';
import FunFact from '../../components/FunFact';
import BlogSection from '../../components/BlogSection/BlogSection';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/footer/Footer';

const HomePage = () => {
    return (
        <Fragment>
            <Header3 />
            <Hero2 />
            <Features />
            <About />
            <Practice3 />
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
export default HomePage;