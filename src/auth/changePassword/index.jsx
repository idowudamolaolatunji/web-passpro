import React, { useEffect, useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import Asterisk from '../../components/Asterisk';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function index() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const [formData, setFormData] = useState({
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [response, setResponse] = useState({ status: '', message: '' });
    const [loading, setLoading] = useState(false);

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    const handleFormChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleResetResponse = function () {
        setResponse({ status: "", message: "" })
    }


    useEffect(function() {
        document.title = "Reset Password";

        if(!email || !token) return navigate('/')
    }, []);


    async function handleChangePassword() {
        setLoading(true);
        handleResetResponse();

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/reset-password`, {
                method: 'POST', headers,
                body: JSON.stringify({ ...formData, email, token })
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
            const message = err?.message == "Failed to fetch" ? "Server is Busy" : err?.message
            setResponse({ status: "error", message });
        } finally {
            setLoading(false);
        }
    }



    return (
        <AuthUI response={response} loading={loading}>
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
                            name='password_confirmation'
                            id="confirm-password"
                            className='form--input'
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            value={formData.password_confirmation}
                            onChange={handleFormChange}
                        />
                        <div className='form--input-icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <ImEye /> : <ImEyeBlocked />}
                        </div>
                    </div>
                </div>


                <button type="submit" className='form--submit' onClick={handleChangePassword}>Change Password</button>
            </div>
        </AuthUI>
    )
}

export default index