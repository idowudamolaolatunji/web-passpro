import React, { useState } from 'react';

import logo from '../../assets/logo/logo-img.png';
import user_img from '../../assets/png/Ellipse 155.png'
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { useWindowSize } from 'react-use';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDataContext } from '../../context/DataContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Dropdown from '../../components/Dropdown';
import ProfileImage from '../../components/ProfileImage';
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/Spinner';
import { RxHamburgerMenu } from 'react-icons/rx';

function DashboardHead() {
    const { width } = useWindowSize();
    const { handleToggleMenu } = useDataContext();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: "", message: "" });

    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShowSearchBar(false);
    }

    return (
        <>
            {loading && <Spinner />}
            {(response.status || response.message) && <CustomAlert type={response.status} message={response.message} />}

            <header className='dashboard--header'>
                {width <= 900 && (
                    <div className="header--main">
                        <span className='header--hamburger' onClick={handleToggleMenu}>
                            <RxHamburgerMenu />
                        </span>

                        <div className="header--logo">
                            <img src={logo} alt='Logo image' />
                        </div>
                    </div>
                )}

                <div className="header--search">
                    <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' />
                    <BiSearch />
                </div>

                <div className="header--others">
                    {showSearchBar && (
                        <div className="header--search" ref={ref}>
                            <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' />
                            <BiSearch />
                        </div>
                    )}

                    {width < 750 && (
                        <span className='header--icon' onClick={() => setShowSearchBar(true)}>
                            <BiSearch />
                        </span>
                    )}


                    {/* FOR THE NEXT MILESTONE */}
                    {/* <span className='header--icon'>
                        <BsBell />
                    </span> */}

                    <div className="user--profile" onClick={() => setShowDropdown(!showDropdown)}>
                        <ProfileImage />
                        <BiChevronDown />

                        {showDropdown && <Dropdown setShow={setShowDropdown} setLoading={setLoading} setResponse={setResponse} />}
                    </div>
                </div>
            </header>

        </>

    )
}

export default DashboardHead