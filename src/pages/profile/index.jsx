import React, { useState } from 'react';
import PageTop from '../../components/PageTop';
import { IoCameraOutline } from 'react-icons/io5';

import img from "../../assets/resources/auth-img.png"
import "./style.css";
import ProfileImage from '../../components/ProfileImage';

function index() {
  const [image, setImage] = useState({ preview: "", file: "" });

  const handleChangeImage = function(e) {
    const file = e.target.files[0];
    if(file) {
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
              
          </div>


          
          <div className="form__container">
              
          </div>
        </div>
    </>
  )
}

export default index