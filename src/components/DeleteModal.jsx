import React from 'react'
import { GrStatusWarning } from 'react-icons/gr'
import Overlay from './Overlay';

function DeleteModal({ title, close, fn }) {

    const handleClose = function () {
        close(false);
    }

    return (
        <>
            <Overlay handleClose={handleClose} />
            <div className='delete modal'>
                <span className='delete--icon'><GrStatusWarning /> </span>
                <h3 className='delete--title'>Are you sure?</h3>
                <p className='delete--text'>This action cannot be undone! All data associated with this {title} will be lost</p>

                <div className='delete--actions'>
                    <button className='btn delete--btn' onClick={fn}>Delete</button>
                    <button className='btn cancel--btn' onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </>

    )
}

export default DeleteModal