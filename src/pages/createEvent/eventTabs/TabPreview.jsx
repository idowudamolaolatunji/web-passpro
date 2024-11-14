import React from 'react'
import PreviewDetailsTop from '../../../components/PreviewDetailsTop'
import { IoTicketOutline } from 'react-icons/io5'

function TabPreview({ eventData, ticketsData, images }) {
  return (
    <>
        <span className="form__container--headiing">Review & Submit</span>

        <div className="preview__container">
            <PreviewDetailsTop images={images} />

            <div className="preview--grid">
                <div className="preview--figure">
                    <span className="preview--figure-heading">
                        <h4>{eventData?.event_name}</h4>
                        <p>{eventData?.event_location}</p>
                        <p>{eventData?.start_date}</p>
                    </span>

                    <p>{eventData?.event_description}</p>
                    
                </div>


                <div className="preview--figure">
                    <span className="preview--figure-title">
                        <IoTicketOutline /> Ticket
                    </span>

                    {ticketsData?.length > 0 && ticketsData?.map(ticket => (
                        <div></div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default TabPreview