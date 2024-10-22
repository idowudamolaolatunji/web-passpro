import React from 'react';

import logo from '../../assets/logo/logo-img.png';
import user_img from '../../assets/png/Ellipse 155.png'
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';

function DashboardHead() {
  return (
    <header className='dashboard--header'>
        <div className="header--logo">
            <img src={logo} alt='Logo image' />
        </div>

        <div className="header--search">
            <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' />
            <BiSearch />
        </div>

        <div className="header--others">
            {/* <span>en<BiChevronDown /></span> */}

            <span className='notification--icon'>
                <BsBell />
            </span>


            <div className="user--profile">
                <img src={user_img} alt="" />

                <BiChevronDown />
            </div>
        </div>
    </header>
  )
}

export default DashboardHead