import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext';

function SocialsForm({ setLoading, setResponse, handleClose }) {
    const { user } = useAuthContext();

    const [socialData, setSocialData] = useState({
        facebook_name: "",
        insta_name: "",
        twitter_x_name: "",
        tiktok_name: "",
        snapchat_name: "",
    })

    const handleChangeData = function (e) {
        const { name, value } = e?.target;
        setSocialData({ ...socialData, [name]: value });
    }

    useEffect(function () {
        setSocialData({
            facebook_name: user?.facebook_name || "",
            insta_name: user?.insta_name || "",
            twitter_x_name: user?.twitter_x_name || "",
            tiktok_name: user?.tiktok_name || "",
            snapchat_name: user?.snapchat_name || "",
        });
    }, []);


    async function handleSubmit() {

    }


    return (

        <form>
            <span className="form--title">Edit Social Media Information</span>

            <div className="form">
                <div className="form--item">
                    <label htmlFor="" className="form--label">Facebook </label>
                    <input className='form--input' placeholder='Facebook Link' name='facebook_name' value={socialData.facebook_name} onChange={handleChangeData} />
                </div>
                <div className="form--item">
                    <label htmlFor="" className="form--label">Instagram </label>
                    <input className='form--input' placeholder='Instagram Link' name='insta_name' value={socialData.insta_name} onChange={handleChangeData} />
                </div>
                <div className="form--item">
                    <label htmlFor="" className="form--label">Twitter </label>
                    <input className='form--input' placeholder='Twitter Link' name='twitter_x_name' value={socialData.twitter_x_name} onChange={handleChangeData} />
                </div>
                <div className="form--item">
                    <label htmlFor="" className="form--label">Tiktok </label>
                    <input className='form--input' placeholder='Tiktok Link' name='tiktok_name' value={socialData.tiktok_name} onChange={handleChangeData} />
                </div>
                <div className="form--item">
                    <label htmlFor="" className="form--label">Snapchat </label>
                    <input className='form--input' placeholder='Snapchat Link' name='snapchat_name' value={socialData.snapchat_name} onChange={handleChangeData} />
                </div>
            </div>

            <div className="form--actions">
                <button className='form--btn btn-prev' onClick={handleClose}>Cancel</button>
                <button className='form--btn btn-next' onClick={handleSubmit}>Submit </button>
            </div>
        </form>
    )
}

export default SocialsForm