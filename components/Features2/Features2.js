import React from 'react'

const Features2 = (props) => {
    return (
        <div className="relative pt-[50px] pb-[30px] bg-no-repeat bg-cover bg-center z-10
               before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-[rgba(21,26,48,.66)]  before:-z-10" style={{ backgroundImage: `url(${'/images/services/1.jpg'})` }}>
            <div className="wraper">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4 md:col-span-6 sm:col-span-12">
                        <div className="bg-transparent border border-[rgba(192,181,150,.4)] flex items-center sm:mx-[30px] col:mx-0">
                            <div className="bg-transparent border-r border-[rgba(192,181,150,.4)]  h-[100px] col:h-[80px] col:w-[80px] w-[100px] text-center px-[18px] col:p-0">
                                <i className="fi flaticon-lawyer text-[60px] col:text-[50px] col:leading-[55px] text-[#c0b596]"></i>
                            </div>
                            <div className="pl-[24px]">
                                <span className="text-[#ada282] text-[16px] font-normal">Book Your</span>
                                <h3 className="text-white text-[27px] col:text-[22px] font-medium">Appointment</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 md:col-span-6 sm:col-span-12 mb-5">
                        <div className="bg-transparent border border-[rgba(192,181,150,.4)] flex items-center sm:mx-[30px] col:mx-0">
                            <div className="bg-transparent border-r border-[rgba(192,181,150,.4)] h-[100px] col:h-[80px] col:w-[80px] w-[100px] text-center px-[18px] col:p-0">
                                <i className="fi flaticon-scale text-[60px] col:text-[50px] col:leading-[55px] text-[#c0b596]"></i>
                            </div>
                            <div className="pl-[24px]">
                                <span className="text-[#ada282] text-[16px] font-normal">Get Free</span>
                                <h3 className="text-white text-[27px] col:text-[22px] font-medium">Expert Advice</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 md:col-span-6 sm:col-span-12 mb-5">
                        <div className="bg-transparent border border-[rgba(192,181,150,.4)] flex items-center sm:mx-[30px] col:mx-0">
                            <div className="bg-transparent border-r border-[rgba(192,181,150,.4)] h-[100px] col:h-[80px] col:w-[80px] w-[100px] text-center px-[18px] col:p-0">
                                <i className="fi flaticon-network text-[60px] col:text-[50px] col:leading-[55px] text-[#c0b596]"></i>
                            </div>
                            <div className="pl-[24px]">
                                <span className="text-[#ada282] text-[16px] font-normal">You Can Easily</span>
                                <h3 className="text-white text-[27px] col:text-[22px] font-medium">Join Our Team</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Features2;