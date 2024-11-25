import React, { useEffect, useState } from 'react'
import Asterisk from '../../../components/Asterisk'
import { truncateString } from '../../../utils/helper';
import { useAuthContext } from '../../../context/AuthContext';
import { useFetchedContext } from '../../../context/FetchedContext';

function BankForm({ setLoading, setResponse, handleClose }) {
    const { handleFetchUserData } = useFetchedContext();
    const { user, headers, shouldKick } = useAuthContext();

    const [banks, setBanks] = useState([]);
    const [numError, setNumError] = useState("")
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


    async function handleSubmit(e) {
        e.preventDefault();
        if(bankData?.account_number.trim().length < 10) {
            setNumError("Account number must be upto to 10 digits");
            return;
        }

        setLoading(true);
        setResponse({ status: "", message: "" });
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/profile/update-bank-info`, {
                method: "PUT", headers,
                body: JSON.stringify(bankData)
            });
            shouldKick(res)

            const data = await res.json();
            if (res.status != 200) {
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
                    <span className="form--error-message">
                        {numError && numError}
                    </span>
                </div>


                <div className="form--item">
                    <label htmlFor="" className="form--label">Account Name <Asterisk /> </label>
                    <input className='form--input' required placeholder='Enter account name' name='account_name' value={bankData.account_name} onChange={handleChangeData} />
                </div>
            </div>


            <div className="form--actions">
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' type='submit'>Submit </button>
            </div>

        </form>
    )
}

export default BankForm