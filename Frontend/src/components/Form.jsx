import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { useEffect } from 'react';
import "../styles/Form.css";

const Form = ({contacts,setContacts}) => {
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    useEffect(() => {
        setIsValid(Object.keys(errors).length === 0);
    }, [errors]);

    const validate = (data) => {
        const newErrors = {};
        if (!data.name.trim()) {
            newErrors.name = "Name is Required";
        }
        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!data.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^[0-9]{10,15}$/.test(data.phone)) {
            newErrors.phone = "Phone must be 10–15 digits";
        }
        return newErrors;
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        const validationErrors = validate(updatedData);
        setErrors(validationErrors);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://contact-form-mern-y40y.onrender.com/", formData);
            setContacts([ response.data,...contacts]);
            toast.success("Successfully Added");
            setFormData({name:"",email:"",phone:"",message:""})
        } catch (err) {
            toast.error(`Error: ${err.response?.data}`);
        }
    }
    return (
        <div className='formCont'>
            <form onSubmit={handleSubmit} action="">
                <div className='inputCont'>
                    <div>
                        <input value={formData.name} name='name' onChange={handleChange} type="text" placeholder='Enter Name' />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div>
                        <input value={formData.email} name="email" onChange={handleChange} type="text" placeholder='Enter Email' />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div>
                        <input value={formData.phone} name="phone" onChange={handleChange} type="tel" placeholder='Enter Phone' />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div>
                        <input value={formData.message} name="message" onChange={handleChange} type="text" placeholder='Enter Message' />
                    </div>
                </div>
                <button className='submitBtn' type='Submit' disabled={!isValid}>Submit</button>
            </form>
        </div>
    )
}

export default Form
