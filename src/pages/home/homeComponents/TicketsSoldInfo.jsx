import React from 'react';

import img from '../../../assets/png/ion_ticket.png'
import { Link } from 'react-router-dom';
import { useFetchedContext } from '../../../context/FetchedContext';

function TicketsSoldInfo() {
    const { ticketOrders } = useFetchedContext();
    const soldValue = ticketOrders?.reduce((acc, order) => acc + order?.ticket_quantity, 0);
    const rangePercent = (soldValue / 1000000) * 100;

  return (
    <div className='sold--figure'>
        <div className="sold--head">
            {/* <h3>Tickets sold Today</h3> */}
            <h3>Tickets sold So Far</h3>

            {/* <span className='sold--insight'>
                <span>{0}%</span>
                <p>Than Yesterday</p>
            </span> */}
        </div>


        <div className="sold--info">
            <img src={img} alt="" />
            <p><span>{soldValue}</span>ps</p>
        </div>

        <div className="sold--range">
            <span style={{ width: rangePercent+ "%" }} />
        </div>

        <p className='sold--text'>Ticket sales for various events, including concerts, sports games, and theater performances, are available through multiple platforms.</p>

        {/* <Link className='sold--link' to="/">View Details</Link> */}

    </div>
  )
}

export default TicketsSoldInfo