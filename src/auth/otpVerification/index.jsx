import React, { useEffect, useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

function index() {
    const [response, setResponse] = useState({ status: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ otp: "", email: JSON.parse(localStorage.getItem("otp_user"))?.email || null });

    const navigate = useNavigate();

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    const handleChangeData = function (value) {
        setFormData({ ...formData, otp: +value });
    }

    const handleResetResponse = function () {
        setResponse({ status: "", message: "" })
    }

    useEffect(function () {
        document.title = "OTP Verification";

        if (!formData?.email) return navigate('/');

        handleRequestOtp()
    }, []);



    async function handleSubmitOtp() {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/verify-otp`, {
                method: 'POST', headers,
                body: JSON.stringify({ ...formData })
            });

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(data?.message || data?.error);
            }

            // // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: "success", message: data.message });

            setTimeout(function () {
                localStorage.removeItem("otp_user");
                navigate('/login');
            }, 1500);

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setLoading(false);
        }
    }


    async function handleRequestOtp() {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/send-otp`, {
                method: 'POST', headers,
                body: JSON.stringify({ email: formData?.email }),
            });

            // RESET THE RESPONSE STATE HERE
            handleResetResponse();

            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(data?.message || data?.error);
            }

            // UPDATE THE RESPONSE STATE WITH THE NEW VALUE
            setResponse({ status: "success", message: data?.message });

        } catch (err) {
            setResponse({ status: 'error', message: err.message })
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthUI loading={loading} response={response}>
            <div className="auth--form">
                <span className='form--top'>
                    <h2 className="form--heading">OTP Verification</h2>
                    <p>Enter your verification code sent to your mail to continue</p>
                </span>


                <div className="form--item otp--item">
                    <OTPInput
                        value={formData.otp}
                        onChange={handleChangeData}
                        inputType="number"
                        numInputs={6}
                        renderSeparator={<span>{" "}</span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{ display: 'flex', alignItems: 'center', gap: '.24rem' }}
                    />
                </div>

                <button type="submit" className='form--submit' onClick={handleSubmitOtp}>Verify OTP</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>Verification code is valid only for 5 minutes</p>
                </div>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <button onClick={handleRequestOtp}>Resend new OTP</button>
                </div>
            </div>
        </AuthUI>
    )
}

export default index