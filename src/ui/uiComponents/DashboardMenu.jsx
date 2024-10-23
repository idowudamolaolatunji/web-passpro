import React, { useState } from 'react'
import MenuItem from './MenuItem'
import { CiGrid41 } from 'react-icons/ci'
import { PiCalendarDotLight, PiGearSixLight, PiTicketLight, PiTrophyLight } from 'react-icons/pi'
import { GoHistory } from 'react-icons/go'
import { useDataContext } from '../../context/DataContext'
import { IoCloseSharp } from 'react-icons/io5'
import Overlay from '../../components/Overlay'

function DashboardMenu() {
    const { showMenu, handleToggleMenu } = useDataContext();

    return (
        <>
            <div className="dashboard--menu">
                <ul className='menu--list'>
                    <MenuItem icon={<CiGrid41 />} text="Dashboard" link="/" />
                    <MenuItem icon={<PiCalendarDotLight />} text="Events" link="/events" />
                    <MenuItem icon={<PiTicketLight />} text="Tickets" link="/tickets" />
                    <MenuItem icon={<PiTrophyLight />} text="Rewards" link="/rewards" />
                    <MenuItem icon={<GoHistory />} text="History" link="/history" />
                </ul>


                <ul className='menu--list'>
                    <MenuItem icon={<PiGearSixLight />} text="History" link="/settings" />
                </ul>
            </div>




            {showMenu && (
                <>
                    <Overlay handleClose={handleToggleMenu} />
                    <div className="dashboard--sidemenu">
                        <div className="sidemenu--hamburger" onClick={handleToggleMenu}>
                            <IoCloseSharp />
                        </div>
                        <ul className='menu--list'>
                            <MenuItem icon={<CiGrid41 />} text="Dashboard" link="/" />
                            <MenuItem icon={<PiCalendarDotLight />} text="Events" link="/events" />
                            <MenuItem icon={<PiTicketLight />} text="Tickets" link="/tickets" />
                            <MenuItem icon={<PiTrophyLight />} text="Rewards" link="/rewards" />
                            <MenuItem icon={<GoHistory />} text="History" link="/history" />
                        </ul>


                        <ul className='menu--list'>
                            <MenuItem icon={<PiGearSixLight />} text="History" link="/settings" />
                        </ul>
                    </div>
                </>
            )}
        </>



    )
}

export default DashboardMenu