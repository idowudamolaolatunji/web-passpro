import React from 'react'
import DashboardBase from '../../ui/DashboardBase'
import PageTop from '../../components/PageTop'
import OrganizationCard from './homeComponents/OrganizationCard'
import HomeInsightGrid from './homeComponents/HomeInsightGrid'
import UpcomingCalender from './homeComponents/UpcomingCalender'
import TicketsSoldInfo from './homeComponents/TicketsSoldInfo'
import AttendeesChart from './homeComponents/AttendeesChart'


function index() {
    return (
        <DashboardBase>

            <PageTop title="Dashboard" />
            <OrganizationCard />
            {/* <section className=''></section> */}


            <div className='content--box'>
                <div className="dashboard--grid">
                    <div className="grid--left">
                        <HomeInsightGrid />

                        <AttendeesChart />

                        <div className="dashboard--card">
                            hi
                        </div>
                    </div>


                    <div className="grid--right">
                        <TicketsSoldInfo />
                        <UpcomingCalender />
                    </div>

                </div>


                <div className="dashboard--card">
                    hi
                </div>

                <div className="dashboard--grid-1">
                    <div className="dashboard--card">
                        hi
                    </div>

                    <div className="dashboard--card">
                        hi
                    </div>
                </div>


                <div className="dashboard--card">
                    hi
                </div>
            </div>

        </DashboardBase>
    )
}

export default index