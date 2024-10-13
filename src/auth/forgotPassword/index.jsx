import React, { useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import Asterisk from '../../components/Asterisk';
import { Link } from 'react-router-dom';

function index() {
    const [formData, setFormData] = useState({
        email: ""
    });

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
                    <h2 className="form--heading">Forgot Password</h2>
                    <p>Enter the password you used during  sign up</p>
                </span>
                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo@gmail.com' onChange={handleFormChange} name="email" id='email' value={formData.email} />
                </div>

                <button type="submit" className='form--submit'>Reset Password</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>I remember my password <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </AuthUI>
    )
}

export default index