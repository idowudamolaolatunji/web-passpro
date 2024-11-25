import React from 'react'
import Modal from '../../../components/Modal'
import { AiOutlineClose } from 'react-icons/ai'
import { formatDateTime, formatNumber, truncateString } from '../../../utils/helper';
import { useAuthContext } from '../../../context/AuthContext';

function index({ handleClose, data }) {
  const { user } = useAuthContext();

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
                <div className='modal--item'>Account Number <span className='modal--value'>{user?.account_number}</span></div>
                <div className='modal--item'>Account Name <span className='modal--value'>{user?.account_name}</span></div>
                <div className='modal--item'>Bank <span className='modal--value'>{user?.bank_name}</span></div>
                <div className='modal--item'>Status 
                  <span className={`modal--value status status--${data?.status}`}>
                    <p>{data?.status}</p>
                  </span>
                </div>

                {data?.status == "rejected" && (
                  <div className='modal--item' style={{ flexDirection: "column", alignItems: "flex-start", gap: "2rem" }}>
                    Rejection Remark
                    <span className="modal--value">
                      {data?.remark}
                    </span>
                  </div>
                )}
                
                <div className='modal--item'>Date Initiated <span className='modal--value'>{formatDateTime(data?.initiated_at)}</span></div>
            </div>
    </Modal>
  )
}

export default index