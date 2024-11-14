import React from 'react'

function PreviewDetailsTop({ bannerUrl, imgUrl }) {
  return (
    <div className='preview--top'>
        <div className='preview--cover'>
            <img src={bannerUrl} />
        </div>

        <span className='preview--img'>
            <img src={imgUrl} />
        </span>
    </div>
  )
}

export default PreviewDetailsTop