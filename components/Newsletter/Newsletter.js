import React from 'react'

const Newsletter = (props) => {


    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <section className="bg-[#272c3f] pt-[70px] pb-[80px]">
            <div className="wraper">
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3 md:col-span-2 "></div>
                    <div className="col-span-6 md:col-span-8 col:col-span-12">
                        <div className="text-center max-w-[443px] col:w-full mx-auto">
                            <h3 className="text-[30px] sm:text-[22px] font-medium mb-[40px] sm:mb-[30px] text-[#c0b596]">Subscribe  Newsletter</h3>
                            <form className="relative" onClick={SubmitHandler}>
                                <input type="text" className="w-full bg-transparent h-[50px] text-white py-[6px] 
                            pr-[80px] pl-[30px] col:pl-[10px] border border-[#ddd] focus:outline-0  rounded-[5px]" placeholder="Enter Your Email Address..." />
                                <button type="submit" className="bg-[#c0b596] text-white border-0 outline-0 absolute right-0 top-0 w-[125px] col:w-[90px] h-[50px]">subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-span-3 md:col-span-2"></div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter;