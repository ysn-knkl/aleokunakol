import React from 'react'
import ContactForm from '../ContactFrom/ContactForm'


const ContactArea = (props) => {
    return (
        <section className={`wpo-contact-area section-wrap ${props.contactclass}`} id="contact">
            <div className="wpo-wpo-contact-form-map">
                <div className="container">
                    <div className="row">
                        <div className="max-w-[640px] mx-auto text-center text-white mb-[60px] md:mb-[40px]">
                            <h2 className="heading-font font-bold text-5xl md:text-[35px] sm:text-[22px] mb-[15px]">Let’s Talk
                            </h2>
                            <p className="base-font text-lg font-normal">Must explain to you how all this mistaken idea pleasure
                                born and give you a complete account.</p>
                        </div>
                    </div>
                    <div className="wraper flex flex-row flex-wrap justify-center">
                        <div className="basis-1/2 md:basis-full">
                            <div className="wpo-contact-form">
                                <h2>Get In Touch</h2>
                                <ContactForm />
                            </div>
                        </div>
                        <div className="basis-1/1 md:basis-full">
                            <div className="wpo-contact-info">
                                <div className="info-item">
                                    <h2>25 North Street,Dubai</h2>
                                    <div className="info-wrap">
                                        <div className="info-icon">
                                            <i className="fi flaticon-location"></i>
                                        </div>
                                        <div className="info-text">
                                            <span>Office Address</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <h2>info@elito.com</h2>
                                    <div className="info-wrap">
                                        <div className="info-icon">
                                            <i className="fi flaticon-mail"></i>
                                        </div>
                                        <div className="info-text">
                                            <span>Official Mail</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <h2>+91 256-987-239</h2>
                                    <div className="info-wrap">
                                        <div className="info-icon">
                                            <i className="fi flaticon-phone-call"></i>
                                        </div>
                                        <div className="info-text">
                                            <span>Official Phone</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-wk">
                <svg width="1500" height="1500" viewBox="0 0 1500 1500" fill="none">
                    <g opacity="0.45" filter="url(#filter0_f_39_4214)">
                        <circle cx="750" cy="750" r="200" />
                    </g>
                    <defs>
                        <filter id="filter0_f_39_4214" x="0" y="0" width="1500" height="1500"
                            filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="275" result="effect1_foregroundBlur_39_4212" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </section>
    )
}

export default ContactArea;