import React, { useEffect } from 'react'
import { useFetchedContext } from '../../../context/FetchedContext';
import TableUI from '../../../components/TableUI';
import Empty from '../../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';
import { formatDateTime } from '../../../utils/helper';
import { Link } from 'react-router-dom';

function RecentEvents() {
    const { events, loader, handleFetchEvents } = useFetchedContext();

    const columns = [
        {
            name: "Event Title",
            selector: row => row?.event_name
        },
        {
            name: "Event location",
            selector: row => row?.event_location,
            width: "25rem"
        },
        {
            name: "Featured",
            selector: row => (
                <span className={`featured featured--${row?.featured ? "yes" : "no"}`}>
                    <p>{row?.featured ? "yes" : "no"}</p>
                </span>
            )
        },
        {
            name: "Event Date",
            selector: row => formatDateTime(row?.start_date, row?.start_date_time)
        },
    ];

    useEffect(function() {
        handleFetchEvents();
    }, []);

    return (
        <div style={{ backgroundColor: "#fff" }}>
            <div className='table--head-flex'>
                <p>Recent Events</p>
                <Link className='table--view-btn' to="/dashboard/events/manage">View More</Link>
            </div>

            <TableUI
                data={events}
                columns={columns}
                loader={loader}
                EmptyComponent={<Empty text={`No events yet`} icon={<BsCalendarEvent />} />}
            />
        </div>
    )
}

export default RecentEvents