import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useFetchedContext } from '../../../context/FetchedContext';
import Asterisk from '../../../components/Asterisk';

function PersonalForm({ setLoading, setResponse, handleClose }) {
    const { handleFetchUserData } = useFetchedContext();
    const { user, headers, shouldKick } = useAuthContext();

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
        setLoading(true);
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/profile/personal-info`, {
                method: "PUT", headers,
                body: JSON.stringify(personalData)
            });
            shouldKick(res)

            const data = await res.json();
            if (res.status != 200) {
                if(!data?.status && data?.errors) {
                    const error = Object.values(data?.errors);
                    throw new Error(error[0][0])
                }
                throw new Error(data?.message || data?.error)
            }
            
            handleFetchUserData()
            setResponse({ status: "success", message: data?.success });
            handleClose()

        } catch(err) {
            setResponse({ status: "error", message: err?.message });
        } finally {
            setLoading(false)
        }
    }

    return (

        <form className='form' onSubmit={handleSubmit}>
            <span className="form--title">Edit Personal Information</span>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">First name <Asterisk /></label>
                    <input className='form--input' placeholder='First name' required name='first_name' value={personalData.first_name} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">Last name <Asterisk /></label>
                    <input className='form--input' placeholder='Last name' required name='last_name' value={personalData.last_name} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Email <Asterisk /></label>
                    <input className='form--input' placeholder='Enter your email' required name='email' value={personalData.email} onChange={handleChangeData} />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">Phone Number <Asterisk /></label>
                    <input className='form--input' placeholder='Phone number' required name='phone_number' value={personalData.phone_number} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--grid">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Username</label>
                    <input className='form--input' readOnly name='username' value={personalData.username} onChange={handleChangeData} disabled />
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">User Role </label>
                    <input className='form--input' value="Vendor" readOnly disabled />
                </div>
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit'>Submit </button>
            </div>
        </form>
    )
}

export default PersonalForm