import React from 'react'

function PreviewDetailsTop({ cover_photo, event_image }) {
  return (
    <div className='preview--top'>
        <div className='preview--cover'>
            <img src={cover_photo} />
        </div>

        <span className='preview--img'>
            <img src={event_image} />
        </span>
    </div>
  )
}

export default PreviewDetailsTop