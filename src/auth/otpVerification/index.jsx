import React, { useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import OTPInput from 'react-otp-input';
import { useLocation } from 'react-router-dom';

function index() {
    const [formData, setFormData] = useState({
        otp: "",
    });

    const { pathname } = useLocation()

    const handleChangeOtp = function (value) {
        setFormData({ ...formData, otp: value });
    }


    return (
        <AuthUI>
            <div className="auth--form">
                <span className='form--top'>
                    <h2 className="form--heading">{pathname == "/verify-otp" ? "OTP Verification" : "Enter Email"}</h2>
                    <p>Enter your verification code sent to your mail to continue</p>
                </span>


                <div className="form--item otp--item">
                    <OTPInput
                        value={formData.otp}
                        onChange={handleChangeOtp}
                        inputType="number"
                        numInputs={5}
                        renderSeparator={<span>{" "}</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}
                    />
                </div>

                <button type="submit" className='form--submit'>{pathname == "/verify-otp" ? "Verify Code" : "Reset Password"}</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>Verification code is valid only for {pathname == "/verify-otp" ? "2" : "30"} minutes</p>
                </div>

            </div>
        </AuthUI>
    )
}

export default index