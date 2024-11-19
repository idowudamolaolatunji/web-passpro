import React from 'react'
import ImageUpload from '../../../components/ImageUpload'
import Asterisk from '../../../components/Asterisk';

function TabTwo({ setImages, images }) {

    const handleImageChange = function (event) {
        const file = event.target.files[0];
        const name = event.target.name;

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages({ ...images, [name]: { file, preview: imageUrl } });
        }
    };


    const handleImageRemove = function(name) {
        setImages({ ...images, [name]: { file: null, preview: null} })
    }


    return (
        <>
            <span className="form__container--headiing">Media & Gallery</span>
            <div className='form'>
                <div className="inform--item">
                    <label className="form--label">
                        <p>Upload Cover Photo <Asterisk /></p>
                        <span>
                            Supported Files:{" "}
                            <strong>.png, .jpg, .jpeg</strong> Image will be resized into <strong>1300x520</strong> px
                        </span>
                    </label>
                    <ImageUpload name="cover_photo" preview={images?.cover_photo?.preview} handleChange={handleImageChange} handleRemove={()=>handleImageRemove("cover_photo")} />
                </div>


                <div className="inform--item">
                    <label className="form--label">
                        <p>Upload Event Image <Asterisk /></p>
                        <span>
                            Supported Files:{" "}
                            <strong>.png, .jpg, .jpeg</strong> Image will be resized into <strong>1300x520</strong> px
                        </span>
                    </label>
                    <ImageUpload name="event_image" preview={images?.event_image?.preview} handleChange={handleImageChange} handleRemove={()=>handleImageRemove("event_image")} />
                </div>
            </div>
        </>
    )
}

export default TabTwo