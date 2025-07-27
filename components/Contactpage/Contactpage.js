import React from 'react';
import ContactForm from '../ContactFrom/ContactForm'


const Contactpage = () => {

    return (

        <section className="relative pt-[120px] pb-0  z-20">
            <div className="wraper">
                <div className="grid grid-cols-12">
                    <div className="col-span-1"></div>
                    <div className="col-span-10 md:col-span-12">
                        <div className="pb-[100px] sm:pb-[60px]">
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-4 md:col-span-6 sm:col-span-12 md:mb-7">
                                    <div className="text-center p-[40px]  shadow-[0_5px_15px_0_rgba(62,65,159,0.1)]">
                                        <div className="w-[85px] h-[85px] bg-[#f5f5f5] leading-[85px] text-center mx-auto rounded-[50%]">
                                            <div className="icon">
                                                <i className="text-[35px] leading-[85px] text-[#282e3f] fa fa-map-marker" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-[25px] text-[#282e3f] font-medium my-[20px]">Address</h2>
                                        <p className="text-[#666] text-[16px] leading-[22px]">245 King Street, Touterie Victoria 8520 Australia</p>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-6 sm:col-span-12 md:mb-7">
                                    <div className="text-center p-[40px]  shadow-[0_5px_15px_0_rgba(62,65,159,0.1)]">
                                        <div className="w-[85px] h-[85px] bg-[#f5f5f5] leading-[85px] text-center mx-auto rounded-[50%]">
                                            <div className="icon">
                                                <i className="text-[35px] leading-[85px] text-[#282e3f] fa fa-envelope" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-[25px] text-[#282e3f] font-medium my-[20px]">Email Us</h2>
                                        <p className="text-[#666] text-[16px] leading-[22px]">barristar@gmail.com</p>
                                        <p className="text-[#666] text-[16px] leading-[22px]">helloyou@gmail.com</p>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-6 sm:col-span-12 md:mb-7">
                                    <div className="text-center p-[40px]  shadow-[0_5px_15px_0_rgba(62,65,159,0.1)]">
                                        <div className="w-[85px] h-[85px] bg-[#f5f5f5] leading-[85px] text-center mx-auto rounded-[50%]">
                                            <div className="icon">
                                                <i className="text-[35px] leading-[85px] text-[#282e3f] fa fa-phone" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-[25px] text-[#282e3f] font-medium my-[20px]">Call Now</h2>
                                        <p className="text-[#666] text-[16px] leading-[22px]">+1 800 123 456 789</p>
                                        <p className="text-[#666] text-[16px] leading-[22px]">+1 800 123 654 987</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[440px] mx-auto text-center mb-[50px]">
                            <h2 className="text-[35px] col:text-[25px] text-[#282e3f] font-base-font font-bold mb-[20px]">Have Any Question?</h2>
                            <p className="text-[#666] text-[16px] leading-[22px]">It is a long established fact that a reader will be distracted
                                content of a page when looking.</p>
                        </div>
                        <div className="p-[50px] bg-white mb-[-125px] relative z-10 shadow-[0_8px_17px_0_rgba(0,0,0,20%),0_6px_20px_0_rgba(0,0,0,19%)] sm:p-7 sm:pt-[50px]">
                             <ContactForm />
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
            <div className="wpo-contact-map-section ">
                <h2 className="hidden">Contact map</h2>
                <div className="h-[550px]">
                    <iframe className="w-full h-full border-0 outline-0 grayscale" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671" allowFullScreen></iframe>
                </div>
            </div>
        </section>
    )

}

export default Contactpage;
