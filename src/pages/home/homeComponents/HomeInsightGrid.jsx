import React from 'react'
import Insight from './Insight'
import { MdOutlineBarChart } from 'react-icons/md'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'
import { FaMoneyBillWave } from 'react-icons/fa'
import { useAuthContext } from '../../../context/AuthContext'

function HomeInsightGrid() {
    const { user, } = useAuthContext();

    return (
        <div className='insight--grid'>
            <Insight title="Income" icon={<MdOutlineBarChart />} value={user?.balance} sign />
            <Insight title="Customers" icon={<HiMiniArrowTrendingUp />} value={0} />
            <Insight title="Increased Sales" icon={<FaMoneyBillWave />} value={0} sign />
        </div>
    )
}

export default HomeInsightGrid