import React from 'react'
import PreviewDetailsTop from '../../../components/PreviewDetailsTop'
import { IoTicketOutline } from 'react-icons/io5'
import { GrLocation } from 'react-icons/gr'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { formatNumber } from '../../../utils/helper'
import PreviewTicket from './PreviewTicket'

function TabPreview({ eventData, images }) {

  return (
    <>
        <span className="form__container--headiing">Review & Submit</span>

        <div className="preview__container">
            <PreviewDetailsTop images={images} />

            <div className="preview--grid">
                <div className="preview--figure">
                    <span className="preview--figure-heading">
                        <h4 className='heading'>Techup Training</h4>
                        <p className='location'><GrLocation /> Guzape Centre, Gwagwalada, Abuja</p>
                        <p className='date'><FaRegCalendarAlt /> 2nd November, 2024</p>
                    </span>

                    <p className='preview--figure-description'>{eventData?.event_description}</p>

                    <span className='preview--figure-socials'>
                        <HiOutlineGlobeAlt />
                        <BiLogoFacebookCircle />
                        <AiFillInstagram />
                        <FaXTwitter />
                    </span>
                </div>


                <div className="preview--figure">
                    <span className="preview--figure-title">
                        <IoTicketOutline /> Ticket
                    </span>

                    {eventData?.tickets?.length > 0 && (
                        <div className='preview--tickets'>
                            {eventData?.tickets?.map(ticket => (
                                <PreviewTicket data={ticket} key={ticket?.ticket_name} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default TabPreview