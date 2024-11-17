import React, { useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function Dropdown({ setShow, setResponse, setLoading }) {
  const { logoutUser } = useAuthContext();
  const ref = useOutsideClick(handleClose);


  function handleClose() {
    setShow(false);
  }

  async function handleLogout() {
    // LOGOUT LOGIC
    setLoading(true);

    const result = await logoutUser();
    setLoading(true);
    if (!result) return setResponse({ status: "error", message: "Error logging out!" })
    setResponse({ status: "success", message: "Logout successful!" });
  }

  return (
    <div className='dropdown--box' ref={ref}>
      <Link to="/dashboard/profile">Profile</Link>
      <div onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default Dropdown