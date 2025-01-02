import React from 'react'
import Asterisk from '../../../components/Asterisk'

function CouponForm() {
    return (

        <>
        <div className='form__container' style={{ maxWidth: "90rem" }}>
            <div className='form'>
                <div className="form--item">
                    <label className="form--label">Coupon Name</label>
                    <input type="text" className="form--input" placeholder='Enter an coupon name' name="" value="" onChange={() => {}} />
                </div>
                <div className="form--item">
                    <label className="form--label">Your Available Event </label>
                    <select className='form--select' name="" value="" onChange={() => {}}>
                        <option hidden>Select avaliable events</option>
                    </select>
                </div>
                <div className="form--item">
                    <label className="form--label">Ticket Type </label>
                    <select className='form--select' name="" value="" onChange={() => {}}>
                        <option hidden>Select a ticket type</option>
                    </select>
                </div>
                <div className="form--item">
                    <label className="form--label">Coupon Code</label>
                    <input className="form--input" placeholder='Enter an code' name="" value="" onChange={() => {}} />
                </div>
                <div className="form--item">
                    <label className="form--label">Discount Type</label>
                    <select className='form--select' name="" value="" onChange={() => {}}>
                        <option hidden>Select a discount</option>
                    </select>
                </div>
                <div className="form--item">
                    <label className="form--label">Quantity of Coupon</label>
                    <input type="text" className="form--input" placeholder='Enter the coupon quantity' name="" value="" onChange={() => {}} />
                </div>
            </div>
        </div>

        <button className='form--btn coupon-btn' type='button'>Create</button>
        </>
    )
}

export default CouponForm