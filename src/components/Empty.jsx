import React from 'react'
import { IoTicketOutline } from 'react-icons/io5'

function Empty({ icon, text }) {
    return (
        <span className='empty-box'>
            <span className='icon'>{icon}</span>
            <p className='text'>{text}</p>
        </span>
    )
}

export default Empty