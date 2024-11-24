import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'

function PersonalForm({ setLoading, setResponse, handleClose }) {
    const { user } = useAuthContext();

    const [personalData, setPersonalData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone_number: "",
    })

    const handleChangeData = function (e) {
        const { name, value } = e?.target;
        setPersonalData({ ...personalData, [name]: value });
    }

    useEffect(function () {
        setPersonalData({
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            username: user?.username || "",
            email: user?.email || "",
            phone_number: user?.phone_number || "",
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();


    }

    return (

        <form className='form'>
            <span className="form--title">Edit Personal Information</span>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">First name</label>
                    <input className='form--input' placeholder='First name' name='first_name' value={personalData.first_name} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">Last name</label>
                    <input className='form--input' placeholder='Last name' name='last_name' value={personalData.last_name} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Email</label>
                    <input className='form--input' placeholder='Enter your email' name='email' value={personalData.email} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">Phone Number</label>
                    <input className='form--input' placeholder='Phone number' name='phone_number' value={personalData.phone_number} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Username</label>
                    <input className='form--input' readOnly name='username' value={personalData.username} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">User Role </label>
                    <input className='form--input' value="Vendor" readOnly />
                </div>
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit' onClick={handleSubmit}>Submit </button>
            </div>
        </form>
    )
}

export default PersonalForm