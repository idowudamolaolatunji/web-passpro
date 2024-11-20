import React from 'react'
import Insight from './Insight'
import { MdOutlineBarChart } from 'react-icons/md'
import { FaMoneyBillWave, FaUsers } from 'react-icons/fa'
import { useAuthContext } from '../../../context/AuthContext'
import { useFetchedContext } from '../../../context/FetchedContext'
import { BsCalendarEvent } from 'react-icons/bs'
import { AiFillCalendar } from 'react-icons/ai'

function HomeInsightGrid() {
    const { user, } = useAuthContext();
    const { events, ticketOrders } = useFetchedContext();
    const uniqueCustomers = new Set(ticketOrders.map(order => order.user_name || order.email)).size;


    return (
        <div className='insight--grid'>
            <Insight title="Income" icon={<MdOutlineBarChart />} value={user?.balance || 0} sign />
            <Insight title="Customers" icon={<FaUsers />} value={uniqueCustomers || 0} />
            <Insight title="Events" icon={<AiFillCalendar />} value={events?.length || 0} />
        </div>
    )
}

export default HomeInsightGrid