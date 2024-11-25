import React from 'react'
import { getInitials } from '../utils/helper';
import { useAuthContext } from '../context/AuthContext';

function ProfileImage() {
    const { user } = useAuthContext();
    const fullname = `${user?.first_name} ${user?.last_name}`;
    
    return (
        <>
            {user?.profile_image ? (
                <img className='item--user-img' src={`${import.meta.env.VITE_STORAGE_URL}/${user?.profile_image}`} alt={user.username} />
            ) : (
                <span className='item--user-img'>{getInitials(fullname)}</span>
            )}
        </>
    )
}

export default ProfileImage