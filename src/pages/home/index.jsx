import React from 'react'
import PageTop from '../../components/PageTop'
import OrganizationCard from './homeComponents/OrganizationCard'
import HomeInsightGrid from './homeComponents/HomeInsightGrid'
import UpcomingCalender from './homeComponents/UpcomingCalender'
import TicketsSoldInfo from './homeComponents/TicketsSoldInfo'
import AttendeesChart from './homeComponents/AttendeesChart'
import RecentEvents from './homeComponents/RecentEvents'
import TicketOrders from './homeComponents/TicketOrders'
import { useWindowSize } from 'react-use'


function index() {
    const { width } = useWindowSize();
    
    return (
        <>
            <PageTop title="Dashboard" />
            <OrganizationCard />

            <div className='content--box'>
                {width <= 600 && <HomeInsightGrid />}

                <div className="dashboard--grid">
                    <div className="grid--left">
                        {width > 600 && <HomeInsightGrid />}
                        <RecentEvents />
                        <TicketOrders />
                    </div>

                    <div className="grid--right">
                        <TicketsSoldInfo />
                        <UpcomingCalender />
                    </div>

                </div>

                <div className="dashboard--grid-1">
                    {/* <div className="dashboard--card">hi</div> */}
                </div>
            </div>

        </>
    )
}

export default index