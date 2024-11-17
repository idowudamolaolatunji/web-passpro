import React from 'react'
import PageTop from '../../components/PageTop'
import Asterisk from '../../components/Asterisk'

function index() {
    return (

        <>

            <PageTop title="Create Support Ticket" />

            <div className="form__container">

                <div className='form'>
                    <div className="form--grid">
                        <div className="form--item">
                            <label className="form--label">Subject <Asterisk /></label>
                            <input type="text" className="form--input" required placeholder='Support ticket subject' />
                            {/* <input type="text" className="form--input" required placeholder='Enter an event name' name="event_name" value={eventData?.event_name} onChange={handleChangeData} /> */}
                        </div>

                        <div className="form--item">
                            <label className="form--label">Event Name <Asterisk /></label>
                            <select name="" id="" className='form--select'>
                                <option type="high">High Priority</option>
                                <option type="low">High Priority</option>
                                <option type="medium">High Priority</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default index