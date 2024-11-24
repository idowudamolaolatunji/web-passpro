import React, { useEffect, useState } from 'react'
import Asterisk from '../../../components/Asterisk'
import { truncateString } from '../../../utils/helper';
import { useAuthContext } from '../../../context/AuthContext';

function BankForm({ setLoading, setResponse, handleClose }) {
    const { user } = useAuthContext();

    const [banks, setBanks] = useState([]);
    const [bankData, setBankData] = useState({
        bank_name: "", account_number: "", account_name: "", 
    })

    const handleChangeData = function(e) {
        const { name, value } = e?.target;
        setBankData({ ...bankData, [name]: value });
    } 

    useEffect(function() {
        async function fetchBanks() {
            const res = await fetch("https://api.paystack.co/bank");
            if(!res.ok) throw new Error("Error");
            const data = await res.json();
            setBanks(data?.data)
        }

        fetchBanks();
    }, [])


    useEffect(function() {
        setBankData({
            bank_name: user?.bank_name || "",
            account_number: user?.account_number || "",
            account_name: user?.account_name || ""
        });
    }, []);


    async function handleSubmit() {

    }


    return (

        <form className='form'>
            <span className="form--title">Edit Bank Information</span>

            <div className="form">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Bank Name <Asterisk /> </label>
                    <select className='form--select' required name="bank_name" value={bankData.bank_name} onChange={handleChangeData}>
                        <option selected hidden>Select your bank</option>

                        {banks?.length > 0 && banks?.map(bank => (
                            <option key={bank?.id} value={bank?.name}>{truncateString(bank?.name, 35)}</option>
                        ))}
                    </select>
                </div>

                <div className="form--item">
                    <label htmlFor="" className="form--label">Account Number <Asterisk /> </label>
                    <input className='form--input' type='number' required placeholder='Enter account number' name='account_number' value={bankData.account_number} onChange={handleChangeData}  />
                </div>


                <div className="form--item">
                    <label htmlFor="" className="form--label">Account Name <Asterisk /> </label>
                    <input className='form--input' required placeholder='Enter account name' name='account_name' value={bankData.account_name} onChange={handleChangeData} />
                </div>
            </div>


            <div className="form--actions">
                <button className='form--btn btn-prev' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' onClick={handleSubmit}>Submit </button>
            </div>

        </form>
    )
}

export default BankForm