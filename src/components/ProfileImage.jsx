import React from 'react'
import { getInitials } from '../utils/helper';
import { useAuthContext } from '../context/AuthContext';

function ProfileImage() {
    const { user } = useAuthContext();
    return (
        <>
            {user?.image ? (
                <img className='item--user-img' src={`${user.profile_image}`} alt={user.username} />
            ) : (
                <span className='item--user-img'>{getInitials(user?.organization_name)}</span>
            )}
        </>
    )
}

export default ProfileImage