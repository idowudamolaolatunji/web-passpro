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

function DashboardHead() {
    const { width } = useWindowSize();
    const { handleToggleMenu } = useDataContext();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShowSearchBar(false);
    }

    return (
        <header className='dashboard--header'>
                {width <= 900 && (
                    <div className="header--main">
                        <span className='header--hamburger' onClick={handleToggleMenu}>
                            <GiHamburgerMenu />
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
                {/* <span>en<BiChevronDown /></span> */}

                {showSearchBar && (
                    <div className="header--search" ref={ref}>
                        <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' />
                        <BiSearch />
                    </div>
                )}

                {width < 750 && (
                    <span className='notification--icon' onClick={() => setShowSearchBar(true)}>
                        <BiSearch />
                    </span>
                )}


                <span className='notification--icon'>
                    <BsBell />
                </span>


                <div className="user--profile" onClick={() => setShowDropdown(!showDropdown)}>
                    <img src={user_img} alt="" />

                    <BiChevronDown />

                    {showDropdown && <Dropdown setShow={setShowDropdown} />}
                </div>
            </div>
        </header>
    )
}

export default DashboardHead