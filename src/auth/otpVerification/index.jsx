import React, { useEffect, useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import OTPInput from 'react-otp-input';
import { useLocation } from 'react-router-dom';

function index() {
    const [response, setResponse] = useState({ status: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ otp: "", email: "" });

    const { pathname } = useLocation();
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    const handleChangeOtp = function (value) {
        setFormData({ ...formData, otp: value });
    }

    const handleResetResponse = function() {
        setResponse({ status: "", message: "" })
    }

    useEffect(function() {
        
    }, [])

    useEffect(function() {
        document.title = "OTP Verification";

        if(!otpUser) return navigate('/login');

        handleRequestOtp()
    }, []);



    async function handleSubmitOtp() {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-otp`, {
                method: 'PATCH', headers,
                body: JSON.stringify({ ...formData })
            });

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            console.log(data);
            // if (data.status !== 'success') {
            //     throw new Error(data.message);
            // }

            // // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            // setResponse({ status: "success", message: data.message });

            // setTimeout(function() {
            //     localStorage.removeItem("otp_user");
            //     navigate('/login');
            // }, 1500);

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setLoading(false);
        }
    }


    async function handleRequestOtp() {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                method: 'POST', headers,
                body: JSON.stringify({ email: formData.email }),
            });

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            const { status, message } = data;
            console.log(data);
            
            if (!status || status !== 'success') {
                throw new Error(message);
            }
            
            const { user } = data?.data;
            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status, message });
            setResent(true);
        
            setOtpUser({ ...otpUser, ...user });

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setLoading(false);
        }
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
                        numInputs={6}
                        renderSeparator={<span>{" "}</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{ display: 'flex', alignItems: 'center', gap: '.24rem' }}
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