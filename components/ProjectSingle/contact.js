import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';


const Contact = () => {


    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
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
                message: ''
            })
        } else {
            validator.showMessages();
        }
    };


    return (
        <form onSubmit={(e) => submitHandler(e)} className="contact-validation-active" >
            <div className='grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3'>
                <div className="form-field mb-4">
                    <input
                        value={forms.name}
                        type="text"
                        name="name"
                        className="form-control"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Name" />
                    {validator.message('name', forms.name, 'required|alpha_space')}
                </div>
                <div className="form-field mb-4">
                    <input
                        value={forms.email}
                        type="email"
                        name="email"
                        className="form-control"
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        placeholder="Your Email" />
                    {validator.message('email', forms.email, 'required|email')}
                </div>
            </div>
            <div className="form-field mb-4">
                <select className="form-control"
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    value={forms.subject}
                    type="text"
                    name="subject">
                    <option>Choose a Service</option>
                    <option>Web Design</option>
                    <option>Web Development</option>
                    <option>Marketing</option>
                </select>
                {validator.message('subject', forms.subject, 'required|alpha_space')}
            </div>
            <textarea
                className="form-control mb-4"
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
                value={forms.message}
                type="text"
                name="message"
                placeholder="Message">
            </textarea>
            {validator.message('message', forms.message, 'required')}

            <div className="submit-area">
                <button type="submit" className="theme-btn"> Submit Now</button>
            </div>
        </form>
    )
}

export default Contact;