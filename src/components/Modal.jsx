import React from 'react'

function Modal({ handleClose, className, children }) {
    return (
        <>
            <div className='global--overlay' onClick={handleClose} />
            <div className={`modal ${className}`}>
                {children}
            </div>
        </>
    )
}

export default Modal