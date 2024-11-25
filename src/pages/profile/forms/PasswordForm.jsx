import React, { useEffect, useState } from 'react'
import Asterisk from '../../../components/Asterisk'
import { useAuthContext } from '../../../context/AuthContext';
import { useFetchedContext } from '../../../context/FetchedContext';
import { validatePasswordUpdateForm } from '../../../utils/helper';
import { ImEye, ImEyeBlocked } from 'react-icons/im';


function PasswordForm({ setLoading, setResponse, handleClose }) {
    const { headers, shouldKick } = useAuthContext();
    const { handleFetchUserData } = useFetchedContext();

    const [formErrors, setFormErrors] = useState({});
    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState({
        current_password: false, new_password: false,
        new_password_confirmation: false,
    });

    const handleChangeData = function (e) {
        const { name, value } = e?.target;
        setPasswordData({ ...passwordData, [name]: value });
    }

    const handleToggleShow = function(name) {
        setShowPassword({...showPassword, [name]: !showPassword[name] });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validatePasswordUpdateForm(passwordData)
        setFormErrors(newErrors);
        if (Object.keys(newErrors).length >= 1) {
            setResponse({ status: "error", message: "All fields are required, correctly!" })
            setTimeout(() => setResponse({ status: "", message: "" }), 2000);
            return;
        };

        setResponse({ status: "", message: "" });
        
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/profile/password-update`, {
                method: "PUT", headers,
                body: JSON.stringify(passwordData)
            });

            const data = await res.json();
            if (!data?.status) {
                throw new Error(data?.message)
            }
            
            handleFetchUserData()
            handleClose()
            setResponse({ status: "success", message: data?.message });

        } catch(err) {
            setResponse({ status: "error", message: err?.message });
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <span className="form--title">Password Update</span>

            <div className="form">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Current Password <Asterisk /> </label>

                    <div className='form--input-box'>
                        <input type={!showPassword.current_password ? "password" : "text"} className='form--input' required placeholder='Enter current password' name='current_password' value={passwordData.current_password} onChange={handleChangeData} />
                        <span className='form--input-icon' onClick={() => handleToggleShow("current_password")}>{!showPassword.current_password ? <ImEye /> : <ImEyeBlocked />}</span>
                    </div>
                    <span className="form--error-message">
                        {formErrors?.current_password && formErrors?.current_password}
                    </span>
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">New Password <Asterisk /> </label>

                    <div className='form--input-box'>
                        <input type={!showPassword.new_password ? "password" : "text"} className='form--input' required placeholder='Enter new password' name='new_password' value={passwordData.new_password} onChange={handleChangeData} />
                        <span className='form--input-icon' onClick={() => handleToggleShow("new_password")}>{!showPassword.new_password ? <ImEye /> : <ImEyeBlocked />}</span>
                    </div>
                    <span className="form--error-message">
                        {formErrors?.new_password && formErrors?.new_password}
                    </span>
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">New Password Confirmation <Asterisk /> </label>

                    <div className='form--input-box'>
                        <input type={!showPassword.new_password_confirmation ? "password" : "text"} className='form--input' required placeholder='Enter password confirmation' name='new_password_confirmation' value={passwordData.new_password_confirmation} onChange={handleChangeData} />
                        <span className='form--input-icon' onClick={() => handleToggleShow("new_password_confirmation")}>{!showPassword.new_password_confirmation ? <ImEye /> : <ImEyeBlocked />}</span>
                    </div>
                    <span className="form--error-message">
                        {formErrors?.new_password_confirmation && formErrors?.new_password_confirmation}
                    </span>
                </div>
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit'>Submit </button>
            </div>

        </form>
    )
}

export default PasswordForm