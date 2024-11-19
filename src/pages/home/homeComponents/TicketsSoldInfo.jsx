import React from 'react';

import img from '../../../assets/png/ion_ticket.png'
import { Link } from 'react-router-dom';

function TicketsSoldInfo() {
    const insightPercent = 0;
    const value = 0

    const rangePercent = (value / 1000000) * 100;

  return (
    <div className='sold--figure'>
        <div className="sold--head">
            <h3>Tickets sold Today</h3>

            <span className='sold--insight'>
                <span>{insightPercent}%</span>
                <p>Than Yesterday</p>
            </span>
        </div>


        <div className="sold--info">
            <img src={img} alt="" />
            <p><span>{value}</span>ps</p>
        </div>

        <div className="sold--range">
            <span style={{ width: rangePercent+ "%" }} />
        </div>

        <p className='sold--text'>ticket sales for various events, including concerts, sports games, and theater performances, are available through multiple platforms...</p>

        <Link className='sold--link' to="/">View Details</Link>

    </div>
  )
}

export default TicketsSoldInfo