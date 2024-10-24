import React from 'react'
import Insight from './Insight'
import { MdOutlineBarChart } from 'react-icons/md'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'
import { FaMoneyBillWave } from 'react-icons/fa'

function HomeInsightGrid() {
    return (
        <div className='insight--grid'>
            <Insight title="Income" icon={<MdOutlineBarChart />} value={300000} sign />
            <Insight title="Customers" icon={<HiMiniArrowTrendingUp />} value={15000} />
            <Insight title="Increased Sales" icon={<FaMoneyBillWave />} value={450000} sign />
        </div>
    )
}

export default HomeInsightGrid