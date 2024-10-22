import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function MenuItem({ link, icon, text }) {
    const { pathname } = useLocation();
    console.log(pathname)

    return (
        <Link to={`/dashboard${link}`} className={`menu--item ${
            (text === 'Dashboard' && (pathname === '/dashboard/' || pathname === '/')) && "is-active" || (text !== "Dashboard" && pathname == link) ? "is-active" : ""
        }`}>
            <span className='menu--icon'>{icon}</span>
            <p className='menu--text'>{text}</p>
        </Link>
    )
}

export default MenuItem