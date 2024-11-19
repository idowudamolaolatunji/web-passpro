import React, { useEffect } from 'react'
import { useFetchedContext } from '../../../context/FetchedContext';
import TableUI from '../../../components/TableUI';
import Empty from '../../../components/Empty';
import { formatDateTime } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { IoTicketOutline } from 'react-icons/io5';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';

function TicketOrders() {
    const { loader, ticketOrders, error, handleFetchTicketOrders } = useFetchedContext();

    const columns = [
        {
            name: "",
            selector: row => {}
        },
        {
            name: "",
            selector: row => {},
        },
        {
            name: "",
            selector: row => {}
        },
        {
            name: "",
            selector: row => {}
        },
    ];

    useEffect(function() {
        handleFetchTicketOrders();
    }, []);

    return (
        <div style={{ backgroundColor: "#fff", width: "100%", overflowX: "auto" }}>
            <div className='table--head-flex'>
                <p>Ticket Orders</p>
                <Link className='table--view-btn' to="">View More</Link>
            </div>

            <TableUI
                data={ticketOrders}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={`Check internet connection`} icon={<MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ticket orders yet`} icon={<IoTicketOutline />} />
                }
            />
        </div>
    )
}

export default TicketOrders