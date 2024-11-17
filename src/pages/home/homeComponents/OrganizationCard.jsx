import React from 'react';

import img from '../../../assets/png/Ellipse 155.png'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { getInitials } from '../../../utils/helper';
import ProfileImage from '../../../components/ProfileImage';

function OrganizationCard() {
  const { user } = useAuthContext();

  return (
    <div className='organization--card' style={{ marginTop: "-1.8rem" }}>
      <div className="card--left">

        <ProfileImage />
        <span>{user?.organization_name}</span>
      </div>

      <div className="card--right">
        <Link to="/dashboard/events/create">Create Events</Link>
      </div>
    </div>
  )
}

export default OrganizationCard