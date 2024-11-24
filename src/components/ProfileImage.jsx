import React from 'react'
import { getInitials } from '../utils/helper';
import { useAuthContext } from '../context/AuthContext';

function ProfileImage() {
    const { user } = useAuthContext();
    const fullname = `${user?.first_name} ${user?.last_name}`;
    
    return (
        <>
            {user?.image ? (
                <img className='item--user-img' src={`${user.profile_image}`} alt={user.username} />
            ) : (
                <span className='item--user-img'>{getInitials(fullname)}</span>
            )}
        </>
    )
}

export default ProfileImage