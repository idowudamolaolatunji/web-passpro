import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import Asterisk from '../../../components/Asterisk';

function AddressForm({ setLoading, setResponse, handleClose }) {
    const { user } = useAuthContext();
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


    }

    return (
        <form className='form'>
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
                <button className='form--btn btn-next' type='submit' onClick={handleSubmit}>Submit </button>
            </div>
        </form>
    )
}

export default AddressForm