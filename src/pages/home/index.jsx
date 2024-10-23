import React from 'react'
import DashboardBase from '../../ui/DashboardBase'
import PageTop from '../../components/PageTop'
import OrganizationCard from './homeComponents/OrganizationCard'
import HomeInsightGrid from './homeComponents/HomeInsightGrid'

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

                        <div className="dashboard--card">
                            hi
                        </div>
                    </div>


                    <div className="grid--right">
                        <div className="dashboard--card">
                            hi
                        </div>
                        <div className="dashboard--card">
                            hi
                        </div>
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