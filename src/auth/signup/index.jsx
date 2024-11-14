import React, { useState } from 'react';

import Asterisk from '../../components/Asterisk';
import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';

import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import '../auth.css';
import AuthUI from '../authComponents/AuthUI';
import CustomAlert from '../../components/CustomAlert';

function index() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [response, setResponse] = useState({ status: '', message: '' });
    const [loading, setLoading] = useState(false);


    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    async function handleSubmit() {
        e.preventDefault();

        if (!isChecked) {
            // IF THE CHECKED IS NOT CHECKED
            setResponse({ status: "error", message: "Accept terms and conditions" });
            setTimeout(() => handleResetResponse(), 5000);
            return;
        }
        
        try {
            // RUN THE LOADING SPINNER
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ ...formData })
            });
            if (!res.ok) {
                throw new Error("Something went wrong, Check internet connection");
            }

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            const { status, message } = data;
            if (!status || status !== 'success') {
                throw new Error(data.message);
            }

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: data.status, message: data.message });

        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthUI>
            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}


            <form className="auth--form">
                <h2 className="form--heading">SignUp</h2>

                <div className="form--item">
                    <label htmlFor="name" className="form--label">Full name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='taiwo mujaideen' required onChange={handleFormChange} name="name" id='name' value={formData.name} />
                </div>
                <div className="form--item">
                    <label htmlFor="phone" className="form--label">Telephone Number <Asterisk /></label>
                    <input type="tel" className="form--input" placeholder='+234908473652' required onChange={handleFormChange} name="phone" id='phone' value={formData.phone} />
                </div>
                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo@gmail.com' required onChange={handleFormChange} name="email" id='email' value={formData.email} />
                </div>
                <div className="form--item">
                    <label htmlFor="password" className="form--label">Password <Asterisk /></label>

                    <div className="form--input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            id="password"
                            className='form--input'
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            value={formData.password}
                            onChange={handleFormChange}
                            required
                        />
                        <div className='form--input-icon' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>
                </div>


                <div className="form--item">
                    <label htmlFor="confirm-password" className="form--label">Confirm Password <Asterisk /></label>

                    <div className="form--input-box">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            id="confirm-password"
                            className='form--input'
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            value={formData.confirmPassword}
                            onChange={handleFormChange}
                            required
                        />
                        <div className='form--input-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>
                </div>

                <div className="form--item">
                    <label htmlFor="businessName" className="form--label">Business Name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='Enter Business Name' required onChange={handleFormChange} name="businessName" id='businessName' value={formData.businessName} />
                </div>

                <div className="form--flex">
                    <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                        <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                            {isChecked && <FaCheck />}
                        </div>
                        <label className='form--text' htmlFor="checkbox">Accept Terms and Conditions</label>
                    </div>
                </div>

                <button type="submit" className='form--submit' onSubmit={handleSubmit}>SignUp</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                </div>
            </form>
        </AuthUI>
    )
}

export default index