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
                <h3>{truncateString(data?.subject, 20)}</h3>
                <span onClick={handleClose}>
                    <AiOutlineClose />
                </span>
            </div>

            <div className="modal--body">
                <div className='modal--item'>Subject <span className='modal--value'>{data?.subject}</span></div>
                <div className='modal--item'>Priority <span className='modal--value'>{data?.priority}</span></div>
                <div className='modal--item'>Status 
                  <span className={`text--status text--${data?.status}`}>{data?.status}</span>
                </div>
                
                {data?.last_message && (
                  <div className='modal--item' style={{ flexDirection: "column", alignItems: "flex-start", gap: "2rem" }}>Last Message
                    <span className="modal--value">
                      {data?.last_message}
                    </span>
                  </div>
                )}

                <div className='modal--item'>Last Reply Date <span className='modal--value'>{data?.last_reply_date || "-- --"}</span></div>
            </div>
    </Modal>
  )
}

export default index