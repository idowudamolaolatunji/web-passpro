import React from 'react'
import Modal from '../../../components/Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { formatDateTime, formatNumber, truncateString } from '../../../utils/helper'

function index({ handleClose, data }) {
  return (
    <Modal className="mini">
        <div className="modal--head">
                <h3>Transaction ID #{truncateString(data?.transaction_reference, 20)}</h3>
                <span onClick={handleClose}>
                    <AiOutlineClose />
                </span>
            </div>

            <div className="modal--body">
                <div className='modal--item'>Gateway <span className='modal--value'>Bank Account</span></div>
                <div className='modal--item'>Amount initated <span className='modal--value'>₦{formatNumber(data?.amount)}</span></div>
                <div className='modal--item'>Amount Received <span className='modal--value'>₦{formatNumber(data?.net_amount)}</span></div>
                <div className='modal--item'>Account Number <span className='modal--value'>{data?.user?.account_number}</span></div>
                <div className='modal--item'>Account Name <span className='modal--value'>{data?.account_name}</span></div>
                <div className='modal--item'>Bank <span className='modal--value'>{data?.bank_name}</span></div>
                <div className='modal--item'>Status 
                  <span className={`modal--value status status--${data?.status}`}>
                    <p>{data?.status}</p>
                  </span>
                </div>
                <div className='modal--item'>Date Initiated <span className='modal--value'>{formatDateTime(data?.initiated_at)}</span></div>
            </div>
    </Modal>
  )
}

export default index