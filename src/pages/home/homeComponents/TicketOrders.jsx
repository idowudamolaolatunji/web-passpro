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
    const data = ticketOrders?.slice(0, 4);

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
        <div className='dashboard--table-head'>
            <div className='table--head-flex'>
                <p>Ticket Orders</p>
                <Link className='table--view-btn' to="">View More</Link>
            </div>

            <TableUI
                data={data}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={`Check internet connection`} icon={<MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ticket orders yet`} icon={<IoTicketOutline />} />
                }
                pagination={false}
            />
        </div>
    )
}

export default TicketOrders