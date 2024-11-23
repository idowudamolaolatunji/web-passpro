import React, { useEffect } from 'react'
import SpinnerMini from './SpinnerMini'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { truncateString } from '../utils/helper'
import { BiCalendarEvent } from 'react-icons/bi'
import { IoTicketOutline } from 'react-icons/io5'

function SearchModal({ setShow, results, loader, message }) {
    const isData = results?.events?.length > 0 || results?.tickets?.length > 0

    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShow(false)
    }

    return (
        <div className="search--modal" ref={ref}>
            {loader && <SpinnerMini />}

            {(!loader && message && !isData) && (
                <p className='search--message'>{message}</p>
            )}

            {(!loader && isData) && (
                <div className='search--body'>
                    <div className='search--result'>
                        <span className='search--title'>Events</span>

                        {results?.events?.length > 0 ? (
                            <div className='search--items'>
                                {results?.events?.slice(0, 5)?.map(el => (
                                    <a href={"/dashboard/events/manage/" + el?.id} className='search--figure' key={el?.id}>
                                        <BiCalendarEvent />
                                        <div className='item--details'>
                                            <p className='title'>{el?.event_name}</p>
                                            <span className='description'>{truncateString(el?.event_description, 60)}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className='search--message'>No Event found</p>
                        )}
                    </div>

                    <div className='search--result'>
                        <span className='search--title'>Tickets</span>

                        {results?.tickets?.length > 0 ? (
                            <div className='search--items'>
                                {results?.tickets?.slice(0, 5)?.map(el => (
                                    <a href={"/dashboard/events/manage/" + el?.event_id} className='search--figure' key={el?.id}>
                                        <IoTicketOutline />
                                        <div className='item--details'>
                                            <p className='title'>{el?.ticket_name}</p>
                                            <span className='description'>{el?.ticket_description}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className='search--message'>No Ticket found</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}

export default SearchModal