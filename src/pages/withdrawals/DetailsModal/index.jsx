import React from 'react'
import Modal from '../../../components/Modal'
import { AiOutlineClose } from 'react-icons/ai'

function index({ title, handleClose, data }) {
  return (
    <Modal className="mini">
        <div className="modal--head">
                <h3>Transaction ID #{title}</h3>
                <span onClick={handleClose}>
                    <AiOutlineClose />
                </span>
            </div>

            <div className="modal--body">
                <div className='modal--item'>Gateway <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Amount initated <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Amount Received <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Account Number <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Account Name <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Bank <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Status <span className='modal--value'>94934933</span></div>
                <div className='modal--item'>Date Initiated <span className='modal--value'>94934933</span></div>
            </div>
    </Modal>
  )
}

export default index