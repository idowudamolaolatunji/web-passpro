import React, { useState } from 'react';
import PageTop from '../../components/PageTop';
import { IoCameraOutline } from 'react-icons/io5';

import ProfileImage from '../../components/ProfileImage';
import Asterisk from '../../components/Asterisk';
import MainDropdownSelect from '../../components/MainDropdownSelect';

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
                    <form className='form'>

                        <div className="form--grid">
                            <div className="form--item">
                                <label className="form--label">Subject <Asterisk /></label>
                                <input type="text" required className="form--input" placeholder='Your subject' name="subject" />
                            </div>

                            <div className="form--item">
                                <label className="form--label">Priority <Asterisk /></label>
                                <input type="text" required className="form--input" placeholder='Your subject' name="subject" />
                            </div>
                        </div>

                        <div className="form--grid">
                            <div className="form--item">
                                <label className="form--label">Subject <Asterisk /></label>
                                <input type="text" required className="form--input" placeholder='Your subject' name="subject" />
                            </div>

                            <div className="form--item">
                                <label className="form--label">Priority <Asterisk /></label>
                                <input type="text" required className="form--input" placeholder='Your subject' name="subject" />
                            </div>
                        </div>

                        <div className="form--grid">
                            <div className="form--item">
                                <label className="form--label">Subject <Asterisk /></label>
                                <MainDropdownSelect />
                            </div>

                            <div className="form--item">
                                <label className="form--label">Priority <Asterisk /></label>
                                <input type="text" required className="form--input" placeholder='Your subject' name="subject" />
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default index