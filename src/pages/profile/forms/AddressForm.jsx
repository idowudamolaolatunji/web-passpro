import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useFetchedContext } from '../../../context/FetchedContext';
import Asterisk from '../../../components/Asterisk';

function AddressForm({ setLoading, setResponse, handleClose }) {
    const { handleFetchUserData } = useFetchedContext();
    const { user, headers, shouldKick } = useAuthContext();

    const [addressData, setAddressData] = useState({ country: "", state: "", city: "" });


    const handleChangeData = function(e) {
        const { name, value } = e?.target;

        setAddressData({ ...addressData, [name]: value });
    } 

    useEffect(function() {
        setAddressData({
            country: user?.country || "",
            state: user?.state || "",
            city: user?.city || ""
        });
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponse({ status: "", message: "" });
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/profile/contact-info`, {
                method: "PUT", headers,
                body: JSON.stringify(addressData)
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
            
            setResponse({ status: "success", message: data?.message });
            handleFetchUserData()
            handleClose()

        } catch(err) {
            setResponse({ status: "error", message: err?.message });
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <span className="form--title">Edit Address Information</span>

            <div className="form--item">
                <label htmlFor="" className="form--label">Country <Asterisk /> </label>
                <input className='form--input' required placeholder='Enter country' name='country' value={addressData?.country} onChange={handleChangeData} />
            </div>

            <div className="form--item">
                <label htmlFor="" className="form--label">State <Asterisk /></label>
                <input className='form--input' required placeholder='Enter state' name='state' value={addressData?.state} onChange={handleChangeData} />
            </div>

            <div className="form--item">
                <label htmlFor="" className="form--label">City </label>
                <input className='form--input' placeholder='Enter city' name='city' value={addressData?.city} onChange={handleChangeData} />
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit'>Submit </button>
            </div>
        </form>
    )
}

export default AddressForm