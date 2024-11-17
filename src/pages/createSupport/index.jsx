import React, { useState } from 'react'
import PageTop from '../../components/PageTop'
import Asterisk from '../../components/Asterisk'
import { AiOutlinePlus } from 'react-icons/ai'
import { truncateString } from '../../utils/helper';

function index() {

    const [supportData, setSupportData] = useState({});
    const [files, setFiles] = useState([]);


    const handleAddFiles = function(event) {
        const newFile = event.target.files[0];
        console.log(newFile);

        if (newFile) {
          setFiles((prevFiles) => [...prevFiles, newFile]);
        }
    }

    console.log(files)


    return (

        <>

            <PageTop title="Create Support Ticket" />

            <div className="form__container">

                <div className='form' style={{ margin: "2.8rem 0 1.2rem" }}>
                    <div className="form--grid">
                        <div className="form--item">
                            <label className="form--label">Subject <Asterisk /></label>
                            <input type="text" className="form--input" required placeholder='Your subject' />
                            {/* <input type="text" className="form--input" required placeholder='Enter an event name' name="event_name" value={eventData?.event_name} onChange={handleChangeData} /> */}
                        </div>

                        <div className="form--item">
                            <label className="form--label">Priority <Asterisk /></label>
                            <select name="" id="" className='form--select'>
                                <option type="high priority">High Priority</option>
                                <option type="medium priority">Medium Priority</option>
                                <option type="low priority">Low Priority</option>
                            </select>
                        </div>
                    </div>



                    <div className="form--item">
                        <label className="form--label">Message <Asterisk /></label>
                        <textarea name="" id="" className="form--input" style={{ minHeight: "20rem" }} placeholder='Type your message' />
                    </div>




                    <div className="form--item">
                        <p className="form--label info">
                            Attachments <span>Max 5 files can be uploaded. Maximum upload size is 256M</span>
                        </p>

                        <div className='add-file'>
                            <span className='form--input'>
                                <label htmlFor="add-file" className='add-label'>Choose file</label>
                                <p>{files?.length == 0 ? "No Choosen File" : files.map(file => (
                                    <>{truncateString(file?.name, 20)},{" "}</>
                                ))}</p>
                            </span>
                            <input type="file" name="" id="add-file" accept="*" maxLength={5} onChange={handleAddFiles} />
                            <label htmlFor="add-file" className='form--label'><AiOutlinePlus /> Add new</label>
                        </div>

                        <p className='add-extra'>Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</p>
                    </div>
                </div>

            </div>


        </>
    )
}

export default index