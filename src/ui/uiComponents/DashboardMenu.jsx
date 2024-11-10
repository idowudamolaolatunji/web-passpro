import React, { useState } from 'react'
import MenuItem from './MenuItem'
import Overlay from '../../components/Overlay'
import logo from '../../assets/logo/logo-img-white.png';

import { transfer, withdrawal, signout, support_ticket, home, right_arrow, calender } from "../../assets/svg";
import { useDataContext } from '../../context/DataContext';
import { IoCloseSharp } from 'react-icons/io5';

const event_sub = [
    { text: "Create Events", link: "/dashboard/events/create" },
    { text: "Manage Events", link: "/dashboard/events/manage" }
]

function DashboardMenu() {
    const { showMenu, handleToggleMenu } = useDataContext();

    return (
        <>
            <div className="dashboard--menu">
                <div className="header--logo" style={{ width: "14.8rem"}}>
                    <img src={logo} alt='Logo image' />
                </div>

                <ul className='menu--list'>
                    <MenuItem icon={home} text="Dashboard" link="/" />
                    <MenuItem icon={calender} text="Events" link="/events" arrow />
                    <MenuItem icon={withdrawal} text="Withdrawals" link="/withdrawals" arrow />
                    <MenuItem icon={transfer} text="Transactions" link="/transactions" arrow />
                    <MenuItem icon={support_ticket} text="Support Tickets" link="/support-tickets" />
                    <MenuItem icon={signout} text="Logout" isBtn />
                </ul>
            </div>




            {showMenu && (
                <>
                    <Overlay handleClose={handleToggleMenu} />
                    <div className="dashboard--sidemenu">
                        <div className="header--logo" style={{ width: "14.8rem"}}>
                            <img src={logo} alt='Logo image' />
                        </div>

                        <div className="sidemenu--hamburger" onClick={handleToggleMenu}>
                            <IoCloseSharp />
                        </div>
                        <ul className='menu--list'>
                            <MenuItem icon={home} text="Dashboard" link="/" />
                            <MenuItem icon={calender} text="Events" link="/events" />
                            <MenuItem icon={withdrawal} text="Withdrawals" link="/withdrawals" />
                            <MenuItem icon={transfer} text="Transactions" link="/transactions" />
                            <MenuItem icon={support_ticket} text="Support Tickets" link="/support-tickets" />
                            <MenuItem icon={signout} text="Logout" isBtn />
                        </ul>
                    </div>
                </>
            )}
        </>



    )
}

export default DashboardMenu