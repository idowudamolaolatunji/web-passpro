import React, { useState } from 'react'
import AuthUI from '../authComponents/AuthUI'
import Asterisk from '../../components/Asterisk';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal';

function index() {
    const [response, setResponse] = useState({ status: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [showModal, setShowModal] = useState(false);

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

    async function handleForgotPassword() {
        setLoading(true);
        handleResetResponse()

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/forgot-password`, {
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
            setShowModal(true)

        } catch (err) {
            const message = err?.message == "Failed to fetch" ? "Server is Busy" : err?.message
            setResponse({ status: "error", message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthUI loading={loading} response={response}>
            {showModal && (
                createPortal(
                    <Modal className="mini" handleClose={() => setShowModal(false)}>
                        <div className="modal--details">
                            <span className='modal--top'>
                                <FiCheckCircle />
                                <h3>Successful</h3>
                            </span>

                            <p style={{ fontSize: "1.5rem", lineHeight: "1.4", textAlign: "center" }}>A reset link has been sent to your email {formData.email}. Click the link and reset your password!</p>
                        </div>
                    </Modal>, document.body
                )
            )}

            <div className="auth--form">
                <span className='form--top'>
                    <h2 className="form--heading">Forgot Password</h2>
                    <p>Enter the password you used during sign up</p>
                </span>
                <div className="form--item">
                    <label htmlFor="email" className="form--label">Email <Asterisk /></label>
                    <input type="email" className="form--input" placeholder='taiwo@gmail.com' required onChange={handleFormChange} name="email" id='email' value={formData.email} />
                </div>

                <button type="submit" className='form--submit' onClick={handleForgotPassword}>Reset Password</button>

                <div className="form--info" style={{ textAlign: "center" }}>
                    <p>I remember my password <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </AuthUI>
    )
}

export default index