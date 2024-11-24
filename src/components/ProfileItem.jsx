import React from 'react'

function ProfileItem({ label, value }) {
  return (
    <div className="profile--item">
        <label className='profile--label'>{label}</label>
        <p className='profile--value'>{value}</p>
    </div>
  )
}

export default ProfileItem