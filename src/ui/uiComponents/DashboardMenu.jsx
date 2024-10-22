import React from 'react'
import MenuItem from './MenuItem'
import { CiGrid41 } from 'react-icons/ci'
import { PiCalendarDotLight, PiGearSixLight, PiTicketLight, PiTrophyLight } from 'react-icons/pi'
import { VscHistory } from 'react-icons/vsc'
import { BsGrid } from 'react-icons/bs'
import { GoHistory } from 'react-icons/go'

function DashboardMenu() {
    return (
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
    )
}

export default DashboardMenu