import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Empty from '../../../components/Empty';
import { IoTicketOutline } from 'react-icons/io5';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { formatNumber } from '../../../utils/helper';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';


const customStyles = {
    table: {
        style: {
            overflowX: 'auto',
            fontFamily: "inherit",
            color: "inherit",
        },
    },
    head: {
        style: {
            fontSize: "1.38rem",
            fontWeight: "500",
            height: "5rem",
        },
    },
    rows: {
        style: {
            minHeight: "6rem",
            cursor: 'pointer',
            fontSize: "1.32rem",
            fontWeight: 500,
            color: "#444444"
        },
    },
    headCells: {
        style: {
            paddingRight: '0.5rem',
            backgroundColor: '#FFEDE5',
            color: '#555',
            height: "5rem",
        },
    },
    cells: {
        style: {
            textAlign: 'center'
        }
    }
};

function TabThree({ eventData, handleDelete, handleShowModal }) {

    const { tickets } = eventData;

    const columns = [
        {
            name: "Ticket Name",
            selector: row => (
                <p className='table--title'><FaExpandArrowsAlt className='rotate-45' />{row?.ticket_name}</p>
            ),
            width: "220px"
        },
        {
            name: "Ticket Details",
            selector: row => (
                <p className='hyphen'>{row?.ticket_description}</p>
            )
        },
        {
            name: "Ticket Quantity",
            selector: row => (
                <p>{row?.ticket_quantity} / unlimited</p>
            )
        },
        {
            name: "Price",
            selector: row => (
                <p>₦{formatNumber(row?.ticket_price)}</p>
            )
        },
        {
            name: "Actions",
            selector: row => (
                <div className='table--actions'>
                    <button><FiEdit /></button>
                    <button onClick={() => handleDelete(row?.ticket_id)}><RiDeleteBinLine style={{ color: "red" }} /></button>
                </div>
            )
        }
    ];


    return (
        <>
            <span className="form__container--headiing">
                Tickets <button className='form--add-btn' onClick={handleShowModal}>Add new ticket</button>
            </span>

            <div className='table--container'>
                <DataTable
                    data={tickets}
                    columns={columns}
                    noDataComponent={<Empty text="Add a ticket to this event" icon={<IoTicketOutline />} />}
                    customStyles={customStyles}
                />
            </div>
        </>
    )
}

export default TabThree