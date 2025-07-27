import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogList from '../../components/BlogList/BlogList.js'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Navbar2 from '../../components/Navbar2/Navbar2';
import Footer from '../../components/footer/Footer';

const BlogPageLeft =() => {
    return(
        <Fragment>
            <Navbar2/>
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'}/> 
            <BlogList gClass={'grid-cols-12'} blLeft={'order-1 md:order-1'} LeftClass={'pl-0 pr-3 md:pr-0'} blRight={'order-2 md:order-first'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default BlogPageLeft;

