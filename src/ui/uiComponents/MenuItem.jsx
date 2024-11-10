import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { right_arrow } from "../../assets/svg/index";


function MenuItem({ link, icon, text, arrow, isBtn }) {
    const { pathname } = useLocation();
    console.log(pathname)

    return (
        <>
            {isBtn ? (
                <button className='menu--item'>
                    <span className='menu--icon'>
                        <img src={icon} alt={text} />
                    </span>
                    <p className='menu--text'>{text}</p>
                </button>
            ) : (
                <Link to={`/dashboard${link}`} className={`menu--item ${
                    (text === 'Dashboard' && (pathname == '/dashboard' || pathname == '/' || pathname == '/dashboard/')) && "is-active" || 
                    (text != "Dashboard" && pathname.includes(link)) ? "is-active" : ""
                }`}>
                    <span className='menu--icon'>
                        <img src={icon} alt={text} />
                    </span>
                    <p className='menu--text'>{text}</p>
                    {arrow && <img className='menu--arrow' src={right_arrow} />}
                </Link>
            )}
        </>
    )
}

export default MenuItem