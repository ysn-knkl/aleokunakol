import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import Navbar2 from '../../components/Navbar2/Navbar2';
import Attorney from '../../components/attorneys';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'

const AttorneyPage =() => {
    return(
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={'Our Attorneys'} pagesub={'Attorneys'}/> 
            <Attorney/>
            <Newsletter />
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AttorneyPage;

