import React from 'react'

function PreviewDetailsTop({ images }) {
  return (
    <div className='preview--top'>
        <div className='preview--cover'>
            <img src={images?.cover_image?.preview} />
        </div>

        <span className='preview--img'>
            <img src={images?.event_image?.preview} />
        </span>
    </div>
  )
}

export default PreviewDetailsTop