import React, { useState } from 'react';

import Asterisk from '../../components/Asterisk';
import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';

import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import '../auth.css';
import AuthUI from '../authComponents/AuthUI';

function index() {
    const [formData, setFormData] = useState({
        role: "user",
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false)

    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <AuthUI>
            <form className="auth--form">
                <h2 className="form--heading">SignUp</h2>

                <div className="form--clicks">
                    <div className={`form--click ${formData.role == "user" ? 'is-selected' : ''}`}
                        onClick={() => setFormData({ ...formData, role: "user" })}
                    >User <span></span></div>
                    <div className={`form--click ${formData.role == "event-creator" ? 'is-selected' : ''}`}
                        onClick={() => setFormData({ ...formData, role: "event-creator" })}
                    >Event Creator <span></span></div>
                </div>

                <div className="form--item">
                    <label htmlFor="name" className="form--label">Full name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='taiwo mujaideen' onChange={handleFormChange} name="name" id='name' value={formData.name} />
                </div>
                <div className="form--item">
                    <label htmlFor="phone" className="form--label">Telephone Number <Asterisk /></label>
                    <input type="tel" className="form--input" placeholder='+234908473652' onChange={handleFormChange} name="phone" id='phone' value={formData.phone} />
                </div>
                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo@gmail.com' onChange={handleFormChange} name="email" id='email' value={formData.email} />
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
                        />
                        <div className='form--input-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>
                </div>



                {formData.role == "event-creator" && (
                    <div className="form--item">
                        <label htmlFor="businessName" className="form--label">Business Name <Asterisk /></label>
                        <input type="text" className="form--input" placeholder='Enter Business Name' onChange={handleFormChange} name="businessName" id='businessName' value={formData.businessName} />
                    </div>
                )}


                <div className="form--flex">
                    <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                        <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                            {isChecked && <FaCheck />}
                        </div>
                        <label className='form--text' htmlFor="checkbox">Accept Terms and Conditions</label>
                    </div>
                </div>

                <button type="submit" className='form--submit'>SignUp</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                </div>
            </form>
        </AuthUI>
    )
}

export default index