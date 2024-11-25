import React, { useEffect } from 'react'
import { useFetchedContext } from '../../../context/FetchedContext';
import TableUI from '../../../components/TableUI';
import Empty from '../../../components/Empty';
import { formatDateTime } from '../../../utils/helper';
import { Link } from 'react-router-dom';
import { IoTicketOutline } from 'react-icons/io5';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { TbServerCog } from 'react-icons/tb';

function TicketOrders() {
    const { loader, ticketOrders, error, handleFetchTicketOrders } = useFetchedContext();
    const data = ticketOrders?.slice(0, 3);

    const columns = [
        {
            name: "Order ID",
            selector: row => "#"+row?.order_code
        },
        {
            name: "Customer",
            selector: row => row?.first_name + " " + row?.last_name,
        },
        {
            name: "Event",
            selector: row => row?.event_title,
        },
        {
            name: "Ticket Purchased",
            selector: row => row?.ticket_name
        },
        {
            name: "Quantity",
            selector: row => row?.ticket_quantity,
            width: "7rem"
        },
        {
            name: "Payment Status",
            selector: row => (
                <div className="status status--pending">
                    <p>{row?.status}</p>
                </div>
            )
        },
        {
            name: "Date Purchased",
            selector: row => formatDateTime(row?.created_at)
        },
    ];

    useEffect(function() {
        handleFetchTicketOrders();
    }, []);

    return (
        <div className='dashboard--table'>
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
                    <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ticket orders yet`} icon={<IoTicketOutline />} />
                }
                pagination={false}
                pointerOnHover={false}
            />
        </div>
    )
}

export default TicketOrders