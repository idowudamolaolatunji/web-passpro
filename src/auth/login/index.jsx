import React, { useState } from 'react';

import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';
import '../auth.css'
import Asterisk from '../../components/Asterisk';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function index() {
    const [formData, setFormData] = useState({
        role: "user",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false)

    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <section className='auth--section'>
            <div className="auth--container">
                <div className="auth--image">
                    <img src={img} alt="authentication women image" />
                </div>

                <div className="auth--form-box">
                    <img className='auth--logo' src={logo} alt="logo image" />

                    <form className="auth--form">


                        <h2 className="form--heading">Sign In</h2>

                        <div className="form--clicks">
                            <div className={
                                `form--click ${formData.role == "user" ? 'is-selected' : ''}`}
                                onClick={() => setFormData({ ...formData, role: "user" })}
                            >User <span></span></div>
                            <div className={`
                                form--click ${formData.role == "event-creator" ? 'is-selected' : ''}`}
                                onClick={() => setFormData({ ...formData, role: "event-creator" })}
                            >Event Creator <span></span></div>
                        </div>

                        <div className="form--item">
                            <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                            <input type="email" className="form--input" placeholder='taiwo@gmail.com' onChange={handleFormChange} name="email" id='email' value={formData.email} />

                        </div>
                        <div className="form--item">
                            <label htmlFor="Password" className="form--label">Password <Asterisk /></label>

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


                        <div className="form--flex">
                            <div className="form--item-flex" onClick={() => setIsChecked(!isChecked)}>
                                <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                                    {isChecked && <FaCheck />}
                                </div>
                                <label className='form--text' htmlFor="checkbox">Remember Me</label>
                            </div>

                            <Link to='/forgot-password'>Forgot Password?</Link>
                        </div>

                        <button type="submit" className='form--submit'>Sign In</button>

                        <div className="form--info" style={{ textAlign: "center" }}>
                            <p>Dont have an account? <Link to='/signup'>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default index