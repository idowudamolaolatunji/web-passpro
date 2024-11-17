import React, { useEffect, useState } from 'react';

import logo from '../../assets/logo/logo-img.png';
import img from '../../assets/resources/auth-img.png';
import '../auth.css'
import Asterisk from '../../components/Asterisk';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthUI from '../authComponents/AuthUI';
import { useAuthContext } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import CustomAlert from '../../components/CustomAlert';

function index() {
    const navigate = useNavigate();
    const { user, handleChange } = useAuthContext();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
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

        try {
            setLoading(true);

            const { password, email } = formData;
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ identifier: email, password  })
            });
            
            handleResetResponse();

            const data = await res.json();
            console.log(data)
            if(data?.error) {
                // IF THE USER IS NOT VERIFIED, REDIRECT THE TO THE VERIFICATION PAGE
                if(data?.error == "Email not verified") {
                    setTimeout(function() {
                        navigate('/verify-otp');
                    }, 1500);
                }

                // IF AND ELSE THROW NEW ERROR
                throw new Error(data?.error);
            }
            

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: "success", message: "Login Successful" });
            setTimeout(function() {
                handleChange(data?.user, data?.token);
            }, 2000);

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setLoading(false);
        }
    }

    useEffect(function() {
        if (user) {
            navigate("/");
        }
    }, [user])

    return (
        <AuthUI>

            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <form className="auth--form" onSubmit={handleSubmit}>
                <h2 className="form--heading">Sign In</h2>

                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo@gmail.com' required onChange={handleFormChange} name="email" id='email' value={formData.email} />

                </div>
                <div className="form--item">
                    <label htmlFor="Password" className="form--label">Password <Asterisk /></label>

                    <div className="form--input-box">
                        <input
                            required
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
        </AuthUI>
    )
}

export default index