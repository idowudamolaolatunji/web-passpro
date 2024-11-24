import React from 'react'

function ProfileSocialItem({ imgSrc, link }) {
  return (
    <div className='profile--social'>
        <div className="social--icon">
            <img src={imgSrc} alt={link || "--"} />
        </div>

        <div className="social--name">
            <p>{link || "--"}</p>
        </div>
    </div>
  )
}

export default ProfileSocialItem