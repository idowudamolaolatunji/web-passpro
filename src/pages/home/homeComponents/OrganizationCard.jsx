import React from 'react';

import img from '../../../assets/png/Ellipse 155.png'

function OrganizationCard() {
  return (
    <div className='organization--card'>
        <div className="card--left">
            <img src={img} alt='my organization' />
            <span>Flexy Events</span>
        </div>

        <div className="card--right">
            <button>Create Events</button>
        </div>
    </div>
  )
}

export default OrganizationCard