import React from 'react'
import ImageUpload from '../../../components/ImageUpload'

function TabTwo() {
    return (
        <>
            <span className="form__container--headiing">Media & Gallery</span>
            <div className='form'>
                <div className="inform--item">
                    <label className="form--label">
                        <p>Upload Cover Photo</p>
                        <span>
                            Supported Files:{" "}
                            <strong>.png, .jpg, .jpeg</strong> Image will be resized into <strong>1300x520</strong> px
                        </span>
                    </label>
                    <ImageUpload preview={""} handleChange={""} handleRemove={""} />
                </div>


                <div className="inform--item">
                    <label className="form--label">
                        <p>Upload Event Image</p>
                        <span>
                            Supported Files:{" "}
                            <strong>.png, .jpg, .jpeg</strong> Image will be resized into <strong>1300x520</strong> px
                        </span>
                    </label>
                    <ImageUpload preview={""} handleChange={""} handleRemove={""} />
                </div>
            </div>
        </>
    )
}

export default TabTwo