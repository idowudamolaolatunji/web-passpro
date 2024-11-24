import React, { useState } from 'react';
import PageTop from '../../components/PageTop';
import { IoCameraOutline } from 'react-icons/io5';

import ProfileImage from '../../components/ProfileImage';
import { FiEdit3 } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';
import ProfileItem from '../../components/ProfileItem';
import ProfileSocialItem from '../../components/ProfileSocialItem';
import { Fb, X, Tk, Ig, Sc } from "../../assets/png"
import { useWindowSize } from 'react-use';

function index() {
    const { width } = useWindowSize();
    const { user } = useAuthContext();

    const [image, setImage] = useState({ preview: "", file: "" });
    const [showModal, setShowModal] = useState({
        image: false,
        address: false,
        bank: false,
        social: false,
    });


    const handleShowModal = function(name) {
        setShowModal({ ...showModal, [name]: !showModal[name]})
    }

    const handleChangeImage = function (e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({ preview: imageUrl, file })
        }
    }


    return (
        <>
            

            <PageTop title="Update Profile" />

            <div className="form profile--form" style={{ gap: "2.4rem" }}>
                <div className="form__container">

                    <div className="profile--head">
                        <span className='profile--image'>
                            {image?.file ? <img src={image?.preview} /> : <ProfileImage />}
                            <label htmlFor='profile-img' className='profile--icon'><IoCameraOutline /></label>
                            <input type="file" id="profile-img" onChange={handleChangeImage} />
                        </span>

                        <div className='profile--user'>
                            <h4 className='profile--title'>Taiwo Mujaideen</h4>
                            <p className='profile--text'>vendor</p>
                            <p className='profile--text'>{user?.state} {user?.country}</p>
                        </div>
                    </div>
                </div>


                <div className="form__container">
                    <span className="form__container--headiing profile--heading">
                        Personal {width > 400 ? "Information" : ""}
                    </span>

                    <div className="profile--container">
                        <ProfileItem label="first name" value={user?.first_name} />
                        <ProfileItem label="last name" value={user?.last_name} />
                        <ProfileItem label="username" value={user?.username} />
                        <ProfileItem label="email address" value={user?.email} />
                        <ProfileItem label="phone number" value={user?.phone_number} />
                        <ProfileItem label="user role" value="vendor" />
                    </div>
                </div>


                <div className="form__container">
                    <span className="form__container--headiing profile--heading">
                        Address {width > 400 ? "Information" : ""}
                        <button className='profile--btn' onClick={() => handleShowModal("address")}>Edit <FiEdit3 /></button>
                    </span>

                    <div className="profile--container">
                        <ProfileItem label="country" value={user?.country || "--"} />
                        <ProfileItem label="city" value={user?.city || "--"} />
                        <ProfileItem label="state" value={user?.state || "--"} />
                    </div>
                </div>

                <div className="form__container">
                    <span className="form__container--headiing profile--heading">
                        Bank Account {width > 400 ? "Information" : ""}
                        <button className='profile--btn' onClick={() => handleShowModal("bank")}>Edit <FiEdit3 /></button>
                    </span>

                    <div className="profile--container">
                        <ProfileItem label="bank name" value={user?.bank_name || "--"} />
                        <ProfileItem label="account number" value={user?.account_number || "--"} />
                        <ProfileItem label="account name" value={user?.account_name || "--"} />
                    </div>
                </div>


                <div className="form__container">
                    <span className="form__container--headiing profile--heading">
                        Social media {width > 400 ? "Information" : ""}
                        <button className='profile--btn' onClick={() => handleShowModal("social")}>Edit <FiEdit3 /></button>
                    </span>

                    <div className="profile--socials">
                        <ProfileSocialItem imgSrc={Fb} link={user?.facebook_name} />
                        <ProfileSocialItem imgSrc={Ig} link={user?.insta_name} />
                        <ProfileSocialItem imgSrc={X} link={user?.twitter_x_name} />
                        <ProfileSocialItem imgSrc={Tk} link={user?.tiktok_name} />
                        <ProfileSocialItem imgSrc={Sc} link={user?.snapchat_name} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default index