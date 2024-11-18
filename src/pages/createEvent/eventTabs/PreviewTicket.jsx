import React from 'react'
import { formatNumber } from '../../../utils/helper'

function PreviewTicket({ data }) {
    return (
        <figure className='preview--ticket' >
            <div>
                <h4 className='title'>{data?.ticket_name}</h4>
                <p className='description'>{data?.ticket_description}</p>
            </div>

            <span className='preview--line' />

            <div>
                <span className='price'>₦{formatNumber(data?.ticket_price)}</span>
                <p className='info'>{data?.ticket_quantity} units availble</p>
            </div>
        </figure>
    )
}

export default PreviewTicket