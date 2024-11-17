import React, { useState } from 'react';

import Asterisk from '../../components/Asterisk';
import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';

import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import '../auth.css';
import AuthUI from '../authComponents/AuthUI';
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/Spinner';

function index() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "test",
        last_name: "acct",
        username: "test_acct",
        phone_number: "234059584874",
        email: "test@mail.com",
        password: "test1234",
        password_confirmation: "test1234",
        organization_name: "test biz"
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

    const handleResetResponse = function() {
        setResponse({ status: "", message: "" })
    }


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)

        if (!isChecked) {
            // IF THE CHECKED IS NOT CHECKED
            setResponse({ status: "error", message: "Accept terms and conditions" });
            setTimeout(() => handleResetResponse(), 5000);
            return;
        }
        
        try {
            // RUN THE LOADING SPINNER
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
                method: 'POST',
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData }),
            });

            handleResetResponse()
            const data = await res.json();
            const { status, message } = data;
            console.log(data)
            if (!status || status !== 'success') {
                throw new Error(message);
            }

            // // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: "success", message });

            // SAVE USER NEEDED INFO IN LOCALSTORAGE
            localStorage.setItem("otp_user", JSON.stringify({ email: formData?.email, firstname: formData?.first_name }));;
            setTimeout(() => navigate('/verify-otp'), 1000);

        } catch (err) {
            setResponse({ status: "error", message: err?.message })
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthUI>

            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <form className="auth--form" onSubmit={handleSubmit}>
                <h2 className="form--heading">Register</h2>

                <div className="form--item">
                    <label htmlFor="fname" className="form--label">First Name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='taiwo' required onChange={handleFormChange} name="first_name" id='fname' value={formData.first_name} />
                </div>
                <div className="form--item">
                    <label htmlFor="lname" className="form--label">Last Name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='mujaideen' required onChange={handleFormChange} name="last_name" id='lname' value={formData.last_name} />
                </div>
                <div className="form--item">
                    <label htmlFor="username" className="form--label">Username <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='@mujaideen_taiwo' required onChange={handleFormChange} name="username" id='username' value={formData.username} />
                </div>
                <div className="form--item">
                    <label htmlFor="phone_number" className="form--label">Telephone Number <Asterisk /></label>
                    <input type="tel" className="form--input" placeholder='+234908473652' required onChange={handleFormChange} name="phone_number" id='phone_number' value={formData.phone_number} />
                </div>
                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo1234@gmail.com' required onChange={handleFormChange} name="email" id='email' value={formData.email} />
                </div>
                <div className="form--item">
                    <label htmlFor="organization_name" className="form--label">Company Name <Asterisk /></label>
                    <input type="text" className="form--input" placeholder='Enter Company Name' required onChange={handleFormChange} name="organization_name" id='organization_name' value={formData.organization_name} />
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
                            name='password_confirmation'
                            id="confirm-password"
                            className='form--input'
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            value={formData.password_confirmation}
                            onChange={handleFormChange}
                            required
                        />
                        <div className='form--input-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>
                </div>

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