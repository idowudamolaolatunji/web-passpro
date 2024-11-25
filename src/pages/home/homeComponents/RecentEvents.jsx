import React, { useEffect } from 'react'
import { useFetchedContext } from '../../../context/FetchedContext';
import TableUI from '../../../components/TableUI';
import Empty from '../../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';
import { formatDateTime } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { TbServerCog } from 'react-icons/tb';

function RecentEvents() {
    const { events, loader, error, handleFetchEvents } = useFetchedContext();
    const data = events?.slice(0, 3);

    const columns = [
        {
            name: "Event Title",
            selector: row => row?.event_name
        },
        {
            name: "Event location",
            selector: row => row?.event_location,
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
        <div className='dashboard--table'>
            <div className='table--head-flex'>
                <p>Recent Events</p>
                <Link className='table--view-btn' to="/dashboard/events/manage">View More</Link>
            </div>

            <TableUI
                data={data}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No events yet`} icon={<BsCalendarEvent />} />
                }
                pagination={false}
                pointerOnHover={false}
            />
        </div>
    )
}

export default RecentEvents