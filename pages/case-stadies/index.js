import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import Navbar2 from '../../components/Navbar2/Navbar2';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import CaseStudies2 from '../../components/CaseStudies2/CaseStudies2';

const CasePage =() => {

    return(
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={'Case Stadies'} pagesub={'Recent Case Stadies'}/> 
            <CaseStudies2/>
            <Newsletter />
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default CasePage;

