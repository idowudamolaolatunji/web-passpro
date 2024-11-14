import React from 'react';

import img from '../../../assets/png/Ellipse 155.png'
import { Link } from 'react-router-dom';

function OrganizationCard() {
  return (
    <div className='organization--card' style={{ marginTop: "-1.8rem" }}>
        <div className="card--left">
            <img src={img} alt='my organization' />
            <span>Flexy Events</span>
        </div>

        <div className="card--right">
            <Link to="/dashboard/events/create">Create Events</Link>
        </div>
    </div>
  )
}

export default OrganizationCard