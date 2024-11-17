import React, { useEffect, useState } from 'react'
import MainDropdownSelect from '../../../components/MainDropdownSelect'
import Asterisk from '../../../components/Asterisk';
import { useFetchedContext } from '../../../context/FetchedContext';

function TabOne({ eventData, setEventData }) {

    const { categories } = useFetchedContext();

    const handleChangeData = function(e) {
        const { value, name } = e?.target;
        setEventData({ ...eventData, [name]: value });
    }


    return (
        <>
            <span className="form__container--headiing">Overview</span>
            <form className='form'>
                <div className="inform--item">
                    <label className="form--label">Event Name <Asterisk /></label>
                    <input type="text" className="form--input" required placeholder='Enter an event name' name="event_name" value={eventData?.event_name} onChange={handleChangeData} />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Description <Asterisk /></label>
                    <textarea className="form--input" required placeholder='Enter an event description' name="event_description" value={eventData?.event_description} onChange={handleChangeData} />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Type <Asterisk /></label>
                    <select className='form--select' name="event_type" value={eventData?.event_type} onChange={handleChangeData}>
                        <option hidden>Select a type</option>
                        <option value="online">Online</option>
                        <option value="physical">Physical</option>
                    </select>
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Location <Asterisk /></label>
                    <input type="text" className="form--input" required placeholder='Enter an event location' name="event_location" value={eventData?.event_location} onChange={handleChangeData} />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Category <Asterisk /></label>
                    <select className='form--select' name="category_id" value={eventData?.category_name} onChange={handleChangeData}>
                        <option hidden>Select a category</option>
                        {categories?.length > 0 && categories?.map((el, i) => (
                            <option value={el?.id} key={i}>{el?.category_name}</option>
                        ))}
                    </select>
                </div>

                <div className="inform--item">
                    <label className="form--label">Start Date <Asterisk /></label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" required name='start_date' min={new Date().toISOString().slice(0, 16)} value={eventData?.start_date} onChange={handleChangeData} />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" required name='start_date_time' value={eventData?.start_date_time} onChange={handleChangeData} />
                    </span>
                </div>

                <div className="inform--item">
                    <label className="form--label">End Date <Asterisk /></label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" required name='end_date' min={eventData?.start_date} value={eventData?.end_date} onChange={handleChangeData} />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" required name='end_date_time' value={eventData?.end_date_time} onChange={handleChangeData} />
                    </span>
                </div>
            </form>
        </>
    )
}

export default TabOne