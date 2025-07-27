import React, { Fragment } from 'react';
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/hero/hero';
import Features from '../components/Features/Features';
import About from '../components/about/about';
import Practice from '../components/Practice';
import CaseStudies from '../components/CaseStudies/CaseStudies';
import Testimonial from '../components/Testimonial/Testimonial';
import ConsultingArea from '../components/ConsultingArea/ConsultingArea';
import Attorney from '../components/attorneys';
import FunFact from '../components/FunFact';
import BlogSection from '../components/BlogSection/BlogSection';
import Newsletter from '../components/Newsletter/Newsletter';
import Scrollbar from '../components/scrollbar/scrollbar';
import Footer from '../components/footer/Footer';

const HomePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-1'} topbarNone={'topbar-none'} />
            <Hero />
            <Features />
            <About />
            <Practice />
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