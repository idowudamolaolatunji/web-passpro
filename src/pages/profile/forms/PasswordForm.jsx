import React, { useEffect, useState } from 'react'
import Asterisk from '../../../components/Asterisk'
import { useAuthContext } from '../../../context/AuthContext';

function PasswordForm({ setLoading, setResponse, handleClose }) {

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleChangeData = function (e) {
        const { name, value } = e?.target;
        setPersonalData({ ...personalData, [name]: value });
    }


    async function handleSubmit(e) {
        e.preventDefault();


    }

    return (
        <form className='form'>
            <span className="form--title">Password Update</span>

            <div className="form">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Current Password <Asterisk /> </label>
                    <input className='form--input' type='number' required placeholder='Enter current password' name='current_password' value={passwordData.current_password} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">New Password <Asterisk /> </label>
                    <input className='form--input' type='number' required placeholder='Enter new password' name='new_password' value={passwordData.new_password} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">New Password Confirmation <Asterisk /> </label>
                    <input className='form--input' required placeholder='Enter password confirmation' name='new_password_confirmation' value={passwordData.new_password_confirmation} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit' onClick={handleSubmit}>Submit </button>
            </div>

        </form>
    )
}

export default PasswordForm