import React, { useState } from 'react'
import NumberInputField from '../../../components/NumberInputField';
import Tab from '../../../components/Tab';
import { FaCheck } from 'react-icons/fa';

function TicketForm({ setTicketsData, handleClose }) {

    const [ticket, setTicket] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        stock: "",
        role: "single",
        type: "free",
        feePaidByGuest: false,
    });

    const isChecked = ticket.feePaidByGuest;
    const handleChecked = function() {
        setTicket({...ticket, feePaidByGuest: !ticket.feePaidByGuest })
    }

    const handleSetFormData = function(e) {
        const { name, value } = e?.target;

        setTicket({
            ...ticket,
            [name]: value,
        });
    }

    return (
        <>
            <div className="form--grid">
                <div className="form--clicks" style={{ gap: "1rem", marginBottom: "1.6rem" }}>
                    <div className={`form--click ${ticket?.role == "single" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, role: "single" })}
                    >Single Ticket <span></span></div>
                    <div className={`form--click ${ticket?.role == "group" ? 'is-selected' : ''}`}
                        onClick={() => setTicket({ ...ticket, role: "group" })}
                    >Group Ticket <span></span></div>
                </div>
            </div>


            <div className="form--grid">
                <div className="form">

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Type</label>

                        <div className="page__tabs">
                            <Tab title="Free" active={ticket.type == "free"} onClick={() => setTicket({ ...ticket, type: "free" })} />
                            <Tab title="Paid" active={ticket.type == "paid"} onClick={() => setTicket({ ...ticket, type: "paid" })} />
                        </div>
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Name</label>
                        <input className='form--input' placeholder='Enter your ticket name' name='name' value={ticket.name} onChange={handleSetFormData} />
                    </div>

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket Description</label>
                        <textarea className='form--input' placeholder='Describe your ticket here' name='description' value={ticket.description} onChange={handleSetFormData} />
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

                    {ticket.type == "paid" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">{ticket.role == "group" ? "Group" : "Ticket"} Price</label>
                            <NumberInputField prefix placeholder="Enter price" />
                        </div>
                    )}

                    <div className="form--item">
                        <label htmlFor="" className="form--label">Ticket purchase Limit</label>
                        <NumberInputField placeholder="Set purchase limit" />
                    </div>

                    {ticket.role == "group" && (
                        <div className="form--item">
                            <label htmlFor="" className="form--label">Group Size</label>
                            <NumberInputField placeholder="Set Size" />
                        </div>
                    )}

                    {ticket.type == "paid" && (
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

            <div className="form--actions" style={(ticket.role == "group" && ticket.type == "paid") ? { margin: "-3rem 0 0" } : {}}>
                <button className='form--btn btn-next' type='button'>Add new ticket </button>
                <button className='form--btn btn-prev' type='button' onClick={handleClose}>Cancel</button>
            </div>
        </>
    )
}

export default TicketForm