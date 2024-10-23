import React from 'react'

function Overlay({ handleClose }) {
  return (
    <div className='global--overlay'  onClick={handleClose}>&nbsp;</div>
  )
}

export default Overlay
