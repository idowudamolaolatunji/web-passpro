import React, { useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import Asterisk from '../../components/Asterisk';

function index() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <AuthUI>
            <div className="auth--form">
                <span className='form--top'>
                    <h2 className="form--heading">Change New Password</h2>
                    <p>Create a new password that you will never forget </p>
                </span>


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


                <button type="submit" className='form--submit'>Change Password</button>
            </div>
        </AuthUI>
    )
}

export default index