import React from 'react'
import { formatNumber } from '../../../utils/helper'

function Insight({ title, icon, value, sign }) {
  return (
    <div className='insight--figure'>
        <p className='insight--title'>{title}</p>

        <div className='figure--detaills'>
            <span className='insight--icon'>{icon}</span>
            <span className='insight--value'>
                <span>{sign && "₦"}</span>
                {formatNumber(value)}
            </span>
        </div>
    </div>
  )
}

export default Insight