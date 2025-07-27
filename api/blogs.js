// images
import blogImg1 from '/public/images/blog/1.jpg';
import blogImg2 from '/public/images/blog/2.jpg';
import blogImg3 from '/public/images/blog/3.jpg';

import blogAvaterImg1 from '/public/images/blog/author-1.jpg';
import blogAvaterImg2 from '/public/images/blog/author-2.jpg';
import blogAvaterImg3 from '/public/images/blog/author-3.jpg';

import blogSingleImg1 from '/public/images/blog-details/img-1.jpg';
import blogSingleImg2 from '/public/images/blog-details/img-2.jpg';
import blogSingleImg3 from '/public/images/blog-details/img-3.jpg';



const blogs = [
    {
        id: '1',
        title: 'Who Can a Victim Sue after a Car Accident?',
        slug:'Who-Can-a-Victim-Sue-after-a-Car-Accident',
        screens: blogImg1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Anne William',
        authorTitle:'Criminal Lawyer',
        authorImg:blogAvaterImg1,
        create_at: '14 AUG,23',
        blogSingleImg:blogSingleImg1, 
        comment:'35',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Car Accidents Caused by Defective Vehicles',
        slug:'Car-Accidents-Caused-by-Defective-Vehicles',
        screens: blogImg2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Konal Biry',
        authorTitle:'Family Lawyer',
        authorImg:blogAvaterImg2,
        create_at: '16 AUG,23',
        blogSingleImg:blogSingleImg2, 
        comment:'80',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: 'Justice May For You If You Are Innocent',
        slug:'Justice-May-For-You-If-You-Are-Innocent',
        screens: blogImg3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jenefer Willy',
        authorTitle:'Business Lawyer',
        authorImg:blogAvaterImg3,
        create_at: '18 AUG,23',
        blogSingleImg:blogSingleImg3,
        comment:'95',
        blClass:'format-video',
    },
];
export default blogs;