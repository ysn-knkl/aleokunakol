import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';


const ConsultingFrom = () => {

    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });
    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        if (validator.allValid()) {
            validator.hideMessages();
            setForms({
                name: '',
                email: '',
                subject: '',
                phone: '',
                message: ''
            })
        } else {
            validator.showMessages();
        }
    };

    return (

        <form method="post" className="contact-validation-active mx-[-15px] overflow-hidden contact-form" id="contact-form-main" onSubmit={(e) => submitHandler(e)}>
            <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
                <input
                    className='form-control w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent focus:bg-white '
                    value={forms.name}
                    type="text"
                    name="name"
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    placeholder="Your Name" />
                {validator.message('name', forms.name, 'required|alpha_space')}
            </div>
            <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
                <input
                    className='form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent focus:bg-white'
                    value={forms.email}
                    type="email"
                    name="email"
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    placeholder="Your Email" />
                {validator.message('email', forms.email, 'required|email')}
            </div>
            <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
                <input
                    className='form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent focus:bg-white'
                    value={forms.phone}
                    type="phone"
                    name="phone"
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    placeholder="Your phone" />
                {validator.message('phone', forms.phone, 'required|phone')}
            </div>
            <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
                <select
                    className='form-control  w-full font-normal bg-[rgba(192,181,150,.2)] h-[50px] border border-[rgba(192,181,150,.5)] text-[#c0b596] transition-all pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent focus:bg-white'
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    value={forms.subject}
                    type="text"
                    name="subject">
                    <option>Family Law</option>
                    <option>Criminal Law</option>
                    <option>Business Law</option>
                    <option>Personal Injury</option>
                    <option>Education Law</option>
                    <option>Drugs Crime</option>
                </select>
                {validator.message('subject', forms.subject, 'required')}
            </div>
            <div className="w-[calc-(100%-25px)] mb-[25px] mx-[15px]">
                <textarea
                    className='form-control  w-full bg-[rgba(192,181,150,.2)] h-[150px] border border-[rgba(192,181,150,.5)]  text-[#c0b596] transition-all pt-[15px] pl-[15px] focus:outline-0 focus:shadow-none focus:border-transparent focus:bg-white'
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    value={forms.message}
                    type="text"
                    name="message"
                    placeholder="Message">
                </textarea>
                {validator.message('message', forms.message, 'required')}
            </div>
            <div className="text-left w-full mb-[10px] ml-[16px]">
                <button type="submit" className="bg-[#c0b596] text-[16px] font-semibold text-white px-[38px] py-[10px]  capitalize inline-block mt-[6px] transition ease-in-out duration-300 hover:bg-[#d4c291]
col:mb-[5px] col:mt-[15px] col:text-[15px] col:px-[18px] col:py-[8px] cursor-pointer ">Appointment</button>
                <div id="loader">
                    <i className="ti-reload"></i>
                </div>
            </div>
        </form>
    )
}

export default ConsultingFrom;