import React from 'react'
import PreviewDetailsTop from './PreviewDetailsTop'
import { IoTicketOutline } from 'react-icons/io5'
import { GrLocation } from 'react-icons/gr'
import { FaRegCalendarAlt, FaSnapchat, FaTiktok } from 'react-icons/fa'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6'
import PreviewTicket from './PreviewTicket'
import { formatStringDateTime, truncateString } from '../utils/helper'
import { useAuthContext } from '../context/AuthContext'
import { RiDeleteBin3Line, RiEdit2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function EventPreview({ eventData, cover_photo, event_image, customStyle, fetchedPreview=false, setShowModal }) {
    const navigate = useNavigate();
    const { user } = useAuthContext();

  return (
    <>
        {!fetchedPreview && (
            <span className="form__container--headiing">Review & Submit</span>
        )}

        <div className="preview__container" style={customStyle}>
            <PreviewDetailsTop cover_photo={cover_photo} event_image={event_image} />

            <div className="preview--grid">
                <div className="preview--figure">
                    <span className="preview--figure-heading">
                        <h4 className='heading'>{eventData?.event_name}</h4>
                        <p className='location'><GrLocation />{eventData?.event_location}</p>
                        <p className='date'><FaRegCalendarAlt />{formatStringDateTime(eventData?.start_date, eventData?.start_date_time)}</p>
                    </span>

                    <p className='preview--figure-description'>{truncateString(eventData?.event_description, 200)}</p>

                    <span className='preview--figure-socials'>
                        {user?.facebook_name && (
                            <a href={
                                !user?.facebook_name.startsWith("https")
                                ? `https://${user?.facebook_name}` : user?.facebook_name 
                            } target='_blank'><BiLogoFacebookCircle /></a>
                        )}
                        {user?.insta_name && (
                            <a href={
                                !user?.insta_name.startsWith("https")
                                ? `https://${user?.insta_name}` : user?.insta_name 
                            } target='_blank'><AiFillInstagram /></a>
                        )}
                        {user?.twitter_x_name && (
                            <a href={
                                !user?.twitter_x_name.startsWith("https") 
                                ? `https://${user?.twitter_x_name}` : user?.twitter_x_name
                            } target='_blank'><FaXTwitter /></a>
                        )}
                        {user?.tiktok_name && (
                            <a href={
                                !user?.tiktok_name.startsWith("https")
                                ? `https://${user?.tiktok_name}` : user?.tiktok_name
                            } target='_blank'><FaTiktok /></a>
                        )}
                        {user?.snapchat_name && (
                            <a href={
                                !user?.snapchat_name.startsWith("https")
                                ? `https://${user?.snapchat_name}` : user?.snapchat_name
                            } target='_blank'><FaSnapchat /></a>
                        )}
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


            {fetchedPreview && (
                <div className='form--actions' style={{ gap: "2rem" }}>
                    <button className='preview--btn edit-btn' onClick={() => navigate(`/dashboard/events/edit/${eventData?.id}`)}><RiEdit2Line />Edit</button>
                    <button className='preview--btn delete-btn' onClick={() => setShowModal(true)}><RiDeleteBin3Line />Delete</button>
                </div>
            )}
        </div>
    </>
  )
}

export default EventPreview