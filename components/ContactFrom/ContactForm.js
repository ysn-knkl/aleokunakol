import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';


const ContactForm = () => {

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
        <form method="post" className="contact-validation-active mx-[-15px] overflow-hidden" id="contact-form-main" onSubmit={(e) => submitHandler(e)}>
            <div className="w-[calc(50%-30px)] float-left mx-[15px] mb-[25px] col:float-none col:w-[calc(100%-25px)]">
                <input
                    className='form-control w-full bg-transparent h-[50px] border border-[#ebebeb] text-[#666] transition-all pl-[25px] focus:outline-0 focus:shadow-none focus:border-[#c0b596] focus:bg-transparent'
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
                    className='form-control  w-full bg-transparent h-[50px] border border-[#ebebeb] text-[#666] transition-all pl-[25px] focus:outline-0 focus:shadow-none focus:border-[#c0b596] focus:bg-transparent'
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
                    className='form-control  w-full bg-transparent h-[50px] border border-[#ebebeb] text-[#666] transition-all pl-[25px] focus:outline-0 focus:shadow-none focus:border-[#c0b596] focus:bg-transparent'
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
                    className='form-control  w-full bg-transparent h-[50px] border border-[#ebebeb] text-[#666] transition-all pl-[25px] focus:outline-0 focus:shadow-none focus:border-[#c0b596] focus:bg-transparent'
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
                    className='form-control  w-full bg-transparent h-[180px] border border-[#ebebeb] text-[#666] transition-all pt-[15px] pl-[25px] focus:outline-0 focus:shadow-none focus:border-[#c0b596] focus:bg-transparent'
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    value={forms.message}
                    type="text"
                    name="message"
                    placeholder="Message">
                </textarea>
                {validator.message('message', forms.message, 'required')}
            </div>
            <div className="text-center w-full mb-[10px]">
                <button type="submit" className="bg-[#c0b596] text-[#fff] inline-block py-[12px] px-[22px] border border-[#666] rounded-[55px] capitalize transition-all hover:bg-[#666] hover:border-transparent">Get in Touch</button>
            </div>
        </form>
    )
}

export default ContactForm;