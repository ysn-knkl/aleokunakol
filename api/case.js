import cimg1 from '/public/images/studies/1.jpg'
import cimg2 from '/public/images/studies/2.jpg'
import cimg3 from '/public/images/studies/3.jpg'
import cimg4 from '/public/images/studies/4.jpg'
import cimg5 from '/public/images/studies/5.jpg'
import cimg6 from '/public/images/studies/6.jpg'



const Cases = [
    {
        Id: '1',
        cTitle: 'General Service', 
        slug: 'General-Service',
        sub:'Corporate',
        cImg:cimg1,
        filterName:'all FamilyMatters Business Injury',
    },
    {
        Id: '2',
        cTitle: 'Personal Issue', 
        slug: 'Personal-Issue',
        sub:'General',
        cImg:cimg2,
        filterName:'all FamilyMatters RealEstate Criminal',
    },
    {
        Id: '3',
        cTitle: 'Business Accounting', 
        slug: 'Business-Accounting',
        sub:'Business',
        cImg:cimg3,
        filterName:'all FamilyMatters Business Criminal Injury',
    },
    {
        Id: '4',
        cTitle: 'Criminal Issue', 
        slug: 'Criminal-Issue',
        sub:'Criminal',
        cImg:cimg4,
        filterName:'all RealEstate Criminal Injury Criminal',
    },
    {
        Id: '5',
        cTitle: 'Family Issue', 
        slug: 'Family-Issue',
        sub:'Family',
        cImg:cimg5,
        filterName:'all RealEstate Business  FamilyMatters Injury',
    },
    {
        Id: '6',
        cTitle: 'Real Estate Issue', 
        slug: 'Real-Estate-Issue',
        sub:'Real Estate',
        cImg:cimg6,
        filterName:'all RealEstate Business  Criminal Injury Criminal',
    },
]

export default Cases;