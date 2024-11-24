import React, { useState } from 'react';
import PageTop from '../../components/PageTop';
import { IoCameraOutline, IoTrashBin } from 'react-icons/io5';

import ProfileImage from '../../components/ProfileImage';
import { FiEdit3 } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';
import ProfileItem from '../../components/ProfileItem';
import ProfileSocialItem from '../../components/ProfileSocialItem';
import { useWindowSize } from 'react-use';
import Spinner from '../../components/Spinner'
import CustomAlert from '../../components/CustomAlert'
import { Fb, X, Tk, Ig, Sc } from "../../assets/png"
import Modal from '../../components/Modal';
import AddressForm from './forms/AddressForm';
import BankForm from './forms/BankForm';
import SocialsForm from './forms/SocialsForm';
import PersonalForm from './forms/PersonalForm';
import PasswordForm from './forms/PasswordForm';

function index() {
    const { width } = useWindowSize();
    const { user } = useAuthContext();

    const [response, setResponse] = useState({ status: "", message: "" });
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState({ preview: null, file: null });
    const [showModal, setShowModal] = useState({
        photo: false,
        address: false,
        bank: false,
        social: false,
        personal: false,
        password: false,
    });


    const handleShowModal = function(name) {
        setShowModal({ ...showModal, [name]: true })
    }

    const handleCloseModal = function(name) {
        setShowModal({ ...showModal, [name]: false })
    }

    const handleChangeImage = function (e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({ preview: imageUrl, file })
        }
    }

    const handleRomoveImage = function() {
        setImage({ file: null, preview: null })
    }


    async function handleUploadImage() {
        const formData = new FormData();
        formData.append("image", Imgfile);
        
        const res = await fetch(`${BASE_API_URL}/${url}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });
        shouldKick(res);

        const data = await res.json();
        return data
    }

    return (
        <>
            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <PageTop title="Update Profile" />

            <div className="form profile--form" style={{ gap: "2.4rem" }}>
                <div className="form__container">

                    <div className="profile--head">
                        <span className='profile--image'>
                            <ProfileImage />
                            <label onClick={() => handleShowModal("photo")} className='profile--icon'><IoCameraOutline /></label>
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
                        <button className='profile--btn' onClick={() => handleShowModal("personal")}>Edit <FiEdit3 /></button>
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
                        Password Update
                        <button className='profile--btn' onClick={() => handleShowModal("password")}>Edit <FiEdit3 /></button>
                    </span>

                    <div className="profile--container">
                        <ProfileItem label="password" value={"***************"} />
                        <ProfileItem label="confirm password" value={"***************"} />
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


            {showModal?.photo && (
                <Modal className="mini" handleClose={() => handleCloseModal("photo")}>
                    <div className="modal--details">

                        <span className='profile--image' style={{ width: "12rem", height: "12rem", border: "1.4px solid #eee", borderRadius: "50%" }}>
                            {image?.file ? <img src={image?.preview} /> : <ProfileImage />}
                            
                            {image?.file ? (
                                <label className='profile--icon' onClick={handleRomoveImage}><IoTrashBin /></label>
                            ) : (
                                <label htmlFor='profile-img' className='profile--icon'><IoCameraOutline /></label>
                            )}

                            <input type="file" id="profile-img" onChange={handleChangeImage} />
                        </span>

                        <button style={{ backgroundColor: "#333", marginTop: "2rem" }} className='form--btn btn-next' onClick={handleUploadImage}>Upload Photo</button>
                    </div>
                </Modal>
            )}

            {(showModal.address) && (
                <Modal handleClose={() => handleCloseModal("address")} className="modal-add-sm">
                    <AddressForm 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        handleClose={() => handleCloseModal("address")}
                    />
                </Modal>
            )}

            {(showModal.bank) && (
                <Modal handleClose={() => handleCloseModal("bank")} className="modal-add-sm">
                    <BankForm 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        handleClose={() => handleCloseModal("bank")}
                    />
                </Modal>
            )}

            {(showModal.social) && (
                <Modal handleClose={() => handleCloseModal("social")} className="modal-add-sm">
                    <SocialsForm 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        handleClose={() => handleCloseModal("social")}
                    />
                </Modal>
            )}

            {(showModal.personal) && (
                <Modal handleClose={() => handleCloseModal("personal")} className="modal-add-sm">
                    <PersonalForm 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        handleClose={() => handleCloseModal("personal")}
                    />
                </Modal>
            )}


            {(showModal.password) && (
                <Modal handleClose={() => handleCloseModal("password")} className="modal-add-sm">
                    <PasswordForm 
                        setLoading={setLoading}
                        setResponse={setResponse}
                        handleClose={() => handleCloseModal("password")}
                    />
                </Modal>
            )}
        </>
    )
}

export default index