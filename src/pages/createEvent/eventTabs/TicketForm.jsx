import React, { useState } from 'react'
import NumberInputField from '../../../components/NumberInputField';
import Tab from '../../../components/Tab';
import { FaCheck } from 'react-icons/fa';

function TicketForm({ setEventData, handleClose }) {

    const [ticket, setTicket] = useState({
        ticket_id: 1,
        ticket_category: "Single Ticket",
        ticket_type: "paid",
        ticket_name: "General Admission",
        ticket_description: "General access to all sessions and workshops.",
        ticket_stock: "Limited Stock",
        ticket_quantity: 500,
        ticket_price: 99.99,
        ticket_purchase_limit: 5,
        transfers_fees_to_guest: false,
        group_size: null
    });
    
    const isChecked = ticket?.transfers_fees_to_guest;

    const handleChecked = function() {
        setTicket({...ticket, transfers_fees_to_guest: !ticket?.transfers_fees_to_guest })
    }

    const handleSetFormData = function(e) {
        const { name, value } = e?.target;

        setTicket({
            ...ticket,
            [name]: value,
        });
    }
    
    const handleAddTicket = function() {
        const newTicket = { ...ticket, ticket_id: Math.floor(Math.random() * 1000) }
        setEventData((prevState) => ({ ...prevState, tickets: [...prevState.tickets, newTicket] }));
        handleClose();
    }

    return (
        <>
            <div className="form--grid">
                <div className="form--clicks" style={{ gap: "1rem", marginBottom: "1.6rem" }}>
                    <div className={`form--click ${ticket?.ticket_category == "single" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, ticket_category: "single" })}
                    >Single Ticket <span></span></div>
                    <div className={`form--click ${ticket?.ticket_category == "group" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, ticket_category: "group" })}
                    >Group Ticket <span></span></div>
                </div>
            </div>


            <form className="form--grid">
                <div className="form">

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Type</label>

                        <div className="page__tabs">
                            <Tab title="Free" active={ticket?.ticket_type == "free"} onClick={() => setTicket({ ...ticket, ticket_type: "free" })} />
                            <Tab title="Paid" active={ticket?.ticket_type == "paid"} onClick={() => setTicket({ ...ticket, ticket_type: "paid" })} />
                        </div>
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Name</label>
                        <input className='form--input' placeholder='Enter your ticket name' name='ticket_name' value={ticket?.ticket_name} onChange={handleSetFormData} />
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Description</label>
                        <textarea className='form--input' placeholder='Describe your ticket here' name='ticket_description' value={ticket?.ticket_description} onChange={handleSetFormData} />
                    </div>
                </div>


                <div className="form">
                    <div className="form--flex">
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Ticket Stock</label>
                            <NumberInputField placeholder="Enter stock amount" />
                        </div>
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Quantity</label>
                            <NumberInputField placeholder="Enter quantity" />
                        </div>
                    </div>

                    {ticket?.ticket_type == "paid" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">{ticket?.ticket_category == "group" ? "Group" : "Ticket"} Price</label>
                            <NumberInputField prefix placeholder="Enter price" />
                        </div>
                    )}

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket purchase Limit</label>
                        <NumberInputField placeholder="Set purchase limit" />
                    </div>

                    {ticket?.ticket_category == "group" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Group Size</label>
                            <NumberInputField placeholder="Set Size" />
                        </div>
                    )}

                    {ticket?.ticket_type == "paid" && (
                        <div className="form--flex">
                            <div className="form--item-flex" onClick={handleChecked}>
                                <div id="checkbox" className={isChecked ? 'is-selected' : ''}>
                                    {isChecked && <FaCheck />}
                                </div>
                                <label className='form--text' htmlFor="checkbox">Transfer fee to guest</label>
                            </div>
                        </div>
                    )}

                </div>
            </form>

            <div className="form--actions" style={(ticket?.ticket_category == "group" && ticket?.ticket_type == "paid") ? { margin: "-3rem 0 0" } : {}}>
                <button className='form--btn btn-next' type='button' onClick={handleAddTicket}>Add new ticket </button>
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
            </div>
        </>
    )
}

export default TicketForm