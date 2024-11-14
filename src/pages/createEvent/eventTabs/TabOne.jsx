import React from 'react'
import MainDropdownSelect from '../../../components/MainDropdownSelect'

function TabOne({ eventData, setEventData }) {
    return (
        <>
            <span className="form__container--headiing">Overview</span>
            <div className='form'>
                <div className="inform--item">
                    <label className="form--label">Event Name</label>
                    <input type="text" className="form--input" />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Description</label>
                    <textarea className="form--input" />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Type</label>
                    <MainDropdownSelect title="a Type" field="name" />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Location</label>
                    <input type="text" className="form--input" />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Type</label>
                    <MainDropdownSelect title="a Category" field="name" />
                </div>
                <div className="inform--item">
                    <label className="form--label">Location Tips</label>
                    <textarea className="form--input" />
                </div>


                <div className="inform--item">
                    <label className="form--label">Start Date</label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" />
                    </span>
                </div>
                <div className="inform--item">
                    <label className="form--label">End Date</label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default TabOne