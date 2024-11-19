import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { SlPicture } from 'react-icons/sl'


function ImageUpload({ name, preview, handleChange, height, handleRemove }) {
    return (
        <span className={`form--img-box ${preview ? "img--preview" : ""}`} style={height}>
            <input type='file' id={name} name={name} accept="image/jpeg, image/png, image/jpg, image/svg" onChange={handleChange} />
            <label htmlFor={name}>
                {preview ? (
                    <img src={preview} alt='Preview' className='img' style={height} />
                ) : (
                    <>
                        <SlPicture />
                        <h3>Click to upload image</h3>
                    </>
                )}
            </label>

            {preview && <button onClick={handleRemove} style={{ fontSize: "2rem" }} className='form--upload-btn delete'><AiOutlineDelete style={{ fontSize: "2.4rem" }} /></button>}
        </span>
    )
}

export default ImageUpload