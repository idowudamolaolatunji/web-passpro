import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Empty from '../../../components/Empty';
import { IoTicketOutline } from 'react-icons/io5';

function TabThree({ ticketsData, showModal, setShowModal }) {

    const columns = [
        {
            name: "Ticket Name",
            selector: row => row?.name,
        },
        {
            name: "",

        }
    ];


    const handleShowTicketModal = function() {
        setShowModal(!showModal);
    }


    return (
        <>
            <span className="form__container--headiing">
                Tickets <button className='form--add-btn' onClick={handleShowTicketModal}>Add new ticket</button>
            </span>

            <div>
                <DataTable
                    data={ticketsData}
                    columns={columns}
                    noDataComponent={<Empty text="Add a ticket to this event" icon={<IoTicketOutline />} />}
                />
            </div>
        </>
    )
}

export default TabThree