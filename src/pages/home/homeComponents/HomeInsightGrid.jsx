import React from 'react'
import Insight from './Insight'
import { MdOutlineBarChart } from 'react-icons/md'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'
import { FaMoneyBillWave } from 'react-icons/fa'
import { useAuthContext } from '../../../context/AuthContext'
import { useFetchedContext } from '../../../context/FetchedContext'
import { BsCalendarEvent } from 'react-icons/bs'

function HomeInsightGrid() {
    const { user, } = useAuthContext();
    const { events } = useFetchedContext();

    return (
        <div className='insight--grid'>
            <Insight title="Income" icon={<MdOutlineBarChart />} value={user?.balance} sign />
            <Insight title="Customers" icon={<HiMiniArrowTrendingUp />} value={0} />
            <Insight title="Events" icon={<BsCalendarEvent />} value={events?.length || 0} />
        </div>
    )
}

export default HomeInsightGrid