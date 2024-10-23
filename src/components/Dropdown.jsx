import React from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { Link } from 'react-router-dom';

function Dropdown({ setShow }) {
    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShow(false);
    }

  return (
    <div className='dropdown--box' ref={ref}>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/inbox">Inbox</Link>

        <div>Logout</div>
    </div>
  )
}

export default Dropdown