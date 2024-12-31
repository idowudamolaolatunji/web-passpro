import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { right_arrow } from "../../assets/svg/index";
import { BsDot } from 'react-icons/bs';


function MenuItem({ link, icon, text, arrow, isBtn, sub, action }) {
    const { pathname } = useLocation();

    const [showSubs, setShowSubs] = useState(false);
    const [currLink, setCurrentLink] = useState(null);

    const handleShowSubs = function(link) {
        setCurrentLink(link)
        setShowSubs(!showSubs);
    }

    useEffect(function() {
        if(pathname.includes(currLink)) {
            setShowSubs(true);
        } else {
            setShowSubs(false)
        }
    }, [pathname, currLink]);

    return (
        <>
            {isBtn ? (

                <button className={`menu--item ${pathname.includes(link) && "is-active"} ${showSubs && "show is-active"}`} onClick={() => sub ? handleShowSubs(link) : action()}>
                    <span className='menu--icon'>
                        <img src={icon} alt={text} />
                    </span>
                    <p className='menu--text'>{text}</p>
                    {arrow && <img className='menu--arrow' src={right_arrow} style={ showSubs ? { transform: "rotate(90deg)" } : {} } />}

                    {(sub && showSubs) && (
                        <ul className='menu--subs'>
                            {sub?.map(el => <Link className={`menu--item ${pathname.includes(el?.link) ? "is-active" : ""}`} to={el?.link} key={el?.text}>
                                <BsDot /> {el?.text}
                            </Link> )}
                        </ul>
                    )}
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