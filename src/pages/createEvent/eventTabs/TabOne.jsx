import React, { useEffect, useState } from 'react'
import MainDropdownSelect from '../../../components/MainDropdownSelect'
import Asterisk from '../../../components/Asterisk';
import { useFetchedContext } from '../../../context/FetchedContext';

function TabOne({ eventData, setEventData }) {

    const { categories } = useFetchedContext();

    const eventTypes = [
        { name: "physical", value: "physical" },
        { name: "online", value: "online" },
    ];

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    // Limited and unlimited | 1 - 5 | 2 - 5 |

    const handleChangeData = function(e) {
        const { value, name } = e?.target;
        setEventData({ ...eventData, [name]: value });
    }

    useEffect(function() {
        if(selectedType) {
            setEventData({...eventData, event_type: selectedType?.value })
        }
        if(selectedCategory) {
            setEventData({...eventData, category_id: selectedCategory?.id })
        }
        console.log(eventData)
    }, [selectedCategory, selectedType]);


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
                    <MainDropdownSelect title="a Type" field="name" options={eventTypes} value={selectedType} setValue={setSelectedType} />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Location <Asterisk /></label>
                    <input type="text" className="form--input" required placeholder='Enter an event location' name="event_location" value={eventData?.event_location} onChange={handleChangeData} />
                </div>
                <div className="inform--item">
                    <label className="form--label">Event Category <Asterisk /></label>
                    <MainDropdownSelect title="a Category" field="category_name" options={categories} value={selectedCategory} setValue={setSelectedCategory} />
                </div>

                <div className="inform--item">
                    <label className="form--label">Start Date <Asterisk /></label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" required name='start_date' value={eventData?.start_date} onChange={handleChangeData} />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" required name='start_date_time' value={eventData?.start_date_time} onChange={handleChangeData} />
                    </span>
                </div>

                <div className="inform--item">
                    <label className="form--label">End Date</label>
                    <span className="form--subitem">
                        <input type="date" className="form--input" required name='end_date' value={eventData?.end_date} onChange={handleChangeData} />
                        <label className="form--label">Time</label>
                        <input type="time" className="form--input" required name='end_date_time' value={eventData?.end_date_time} onChange={handleChangeData} />
                    </span>
                </div>
            </form>
        </>
    )
}

export default TabOne