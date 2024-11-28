import React, { useEffect, useState } from 'react'
import NumberInputField from '../../../components/NumberInputField';
import Tab from '../../../components/Tab';
import { FaCheck } from 'react-icons/fa';
import Asterisk from '../../../components/Asterisk';
import { validateTicketForm } from '../../../utils/helper';

function TicketForm({ setEventData, handleClose, setResponse }) {

    const [ticket, setTicket] = useState({
        ticket_id: null,
        ticket_category: "Single Ticket",
        ticket_type: "free",
        ticket_name: "",
        ticket_description: "",
        ticket_stock: null,
        ticket_quantity: null,
        ticket_price: 0.0,
        ticket_purchase_limit: null,
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
    
    const handleAddTicket = function(e) {
        const error = validateTicketForm(ticket);
        console.log(error)
        if(Object.keys(error).length >= 1) {
            setResponse({ status: "error", message: "Fill required fields to proceed!" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }

        const newTicket = { ...ticket, ticket_id: Math.floor(Math.random() * 1000) }
        setEventData((prevState) => ({ ...prevState, tickets: [...prevState.tickets, newTicket] }));
        handleClose();
    }


    return (
        <>
            <div className="form--grid">
                <div className="form--clicks" style={{ gap: "1rem", marginBottom: "1.6rem" }}>
                    <div className={`form--click ${ticket?.ticket_category == "Single Ticket" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, ticket_category: "Single Ticket" })}
                    >Single Ticket <span></span></div>
                    <div className={`form--click ${ticket?.ticket_category == "Group Ticket" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, ticket_category: "Group Ticket" })}
                    >Group Ticket <span></span></div>
                </div>
            </div>


            <div className="form--grid">
                <div className="form">

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Type <Asterisk /> </label>

                        <div className="page__tabs">
                            <Tab title="Free" active={ticket?.ticket_type == "free"} onClick={() => setTicket({ ...ticket, ticket_type: "free" })} />
                            <Tab title="Paid" active={ticket?.ticket_type == "paid"} onClick={() => setTicket({ ...ticket, ticket_type: "paid" })} />
                        </div>
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Name <Asterisk /> </label>
                        <input className='form--input' placeholder='Enter your ticket name' name='ticket_name' value={ticket?.ticket_name} onChange={handleSetFormData} />
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Description <Asterisk /> </label>
                        <textarea className='form--input' placeholder='Describe your ticket here' name='ticket_description' value={ticket?.ticket_description} onChange={handleSetFormData} />
                    </div>
                </div>


                <div className="form">
                    <div className="form--flex">
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Ticket Stock <Asterisk /> </label>
                            <select name="ticket_stock" className='form--select' id="" value={ticket?.ticket_stock} onChange={handleSetFormData}>
                                <option hidden selected>Select a stock type</option>   
                                <option value="Limited Stock">Limited Stock</option>
                                <option value="Unlimited Stock">Unlimited Stock</option>
                            </select>
                        </div>

                        {ticket?.ticket_stock == "Limited Stock" && (
                            <div className="form--item">
                                <label htmlFor="" className="form--label">Quantity <Asterisk /> </label>
                                <NumberInputField name="ticket_quantity" placeholder="Enter quantity" value={ticket.ticket_quantity} onChange={handleSetFormData}/>
                            </div>
                        )}
                    </div>

                    {ticket?.ticket_type == "paid" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">{ticket?.ticket_category == "Group Size" ? "Group" : "Ticket"} Price <Asterisk /></label>
                            <NumberInputField name="ticket_price" prefix placeholder="Enter price" decimalsLimit={2} value={ticket.ticket_price} onChange={handleSetFormData}/>
                        </div>
                    )}

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket purchase Limit <Asterisk /></label>
                        <select name="ticket_purchase_limit" className='form--select' id="" value={ticket?.ticket_purchase_limit} onChange={handleSetFormData}>
                            <option hidden selected>Select a purchase limit</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    {ticket?.ticket_category == "Group Ticket" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Group Size <Asterisk /></label>
                            <select name="group_size" className='form--select' id="" value={ticket?.group_size} onChange={handleSetFormData}>
                                <option hidden selected>Select a group size</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
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
            </div>

            <div className="form--actions" style={(ticket?.ticket_category == "group" && ticket?.ticket_type == "paid") ? { margin: "-3rem 0 0" } : {}}>
                <button className='form--btn btn-next' onClick={handleAddTicket}>Add new ticket </button>
                <button className='form--btn btn-prev' onClick={handleClose}>Cancel</button>
            </div>
        </>
    )
}

export default TicketForm