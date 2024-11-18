import React from 'react'

function Line({ where=null, value=0, border=1.24, color='#eeeff1' }) {

    const customStyle = {
        [where && `margin${where}`]: value,
        borderTop: `${border}px solid ${color}`
    }

  return (
    <div className='line' style={customStyle} />
  )
}

export default Line