import React from 'react'
import { formatNumber, truncateString } from '../../../utils/helper'

function PreviewTicket({ data }) {
    return (
        <figure className='preview--ticket' >
            <div>
                <h4 className='title'>{data?.ticket_name}</h4>
                <p className='description'>{truncateString(data?.ticket_description, 50)}</p>
            </div>

            <span className='preview--line' />

            <div>
                <span className='price'>₦{formatNumber(data?.ticket_price)}</span>
                <p className='info'>{data?.ticket_quantity || data?.ticket_stock} units availble</p>
            </div>
        </figure>
    )
}

export default PreviewTicket