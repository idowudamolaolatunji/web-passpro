import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { SlPicture } from 'react-icons/sl'


function ImageUpload({ preview, handleChange, height, handleRemove }) {
    return (
        <span className={`form--img-box ${preview ? "img--preview" : ""} `} style={height}>
            <input type='file' id='form-image' name={name} accept="image/*" onChange={handleChange} />
            <label htmlFor='form-image'>
                {preview ? (
                    <img src={preview} alt='Preview' className='img' style={height} />
                ) : (
                    <>
                        <SlPicture />
                        <h3>Click to upload image</h3>
                    </>
                )}
            </label>

            {preview && <button onClick={handleRemove} className='form--upload-btn delete'><AiOutlineDelete /></button>}
        </span>
    )
}

export default ImageUpload