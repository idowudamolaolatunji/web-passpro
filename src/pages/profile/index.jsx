import React, { useState } from 'react';
import PageTop from '../../components/PageTop';
import { IoCameraOutline } from 'react-icons/io5';

import ProfileImage from '../../components/ProfileImage';
import Asterisk from '../../components/Asterisk';
import MainDropdownSelect from '../../components/MainDropdownSelect';
import { FiEdit3 } from 'react-icons/fi';

function index() {
    const [image, setImage] = useState({ preview: "", file: "" });

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

            <div className="form" style={{ gap: "2.4rem" }}>
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
                            <p className='profile--text'>Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>


                <div className="form__container">
                    <span className="form__container--headiing profile--heading">
                        Overview
                        <button className='profile--btn'>Edit <FiEdit3 /></button>
                    </span>

                    <div className="profile--item">
                        
                    </div>

                </div>
            </div>
        </>
    )
}

export default index