import React, { useState } from 'react'
import PageTop from '../../components/PageTop'
import Asterisk from '../../components/Asterisk'
import { AiOutlinePlus } from 'react-icons/ai'
import { truncateString } from '../../utils/helper';
import Spinner from '../../components/Spinner';
import CustomAlert from '../../components/CustomAlert';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function index() {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;
    const { token, shouldKick } = useAuthContext();

    const [response, setResponse] = useState({ status: "", message: "" });
    const [loading, setLoading] = useState(false);

    const [supportData, setSupportData] = useState({
        subject: "Payment Issue",
        message: "I was charged twice for my last transaction.",
        priority: "High",
    });
    const [attachments, setAttachments] = useState([]);


    const handleAddFiles = function (event) {
        const newFile = event.target.files[0];

        if (newFile) {
            setAttachments((prevFiles) => [...prevFiles, newFile]);
        }
    }

    const handleChangeData = function (event) {
        const { name, value } = event?.target;

        setSupportData({
            ...supportData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponse({ status: "", message: "" });

        const formData = new FormData();
        formData.append('subject', supportData.subject);
        formData.append('message', supportData.message);
        formData.append('priority', supportData.priority);
        formData.append('attachments', JSON.stringify(attachments));

        try {
            const res = await fetch(`${BASE_URL}/support-tickets`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            shouldKick(res);

            const data = await res.json();
            if (res.status != 201) {
                throw new Error(data?.message || data?.error)
            }

            setResponse({ status: "success", message: data?.message });
            setTimeout(() => navigate("/dashboard/support-tickets/manage"), 2000);

        } catch (err) {
            setResponse({ status: "error", message: err?.message })
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <PageTop title="Create Ticket" />

            <div className="form__container">

                <form className='form' style={{ margin: "2.8rem 0 1.2rem" }} onSubmit={handleSubmit}>
                    <div className="form--grid">
                        <div className="form--item">
                            <label className="form--label">Subject <Asterisk /></label>
                            <input type="text" required className="form--input" placeholder='Your subject' name="subject" value={supportData?.subject} onChange={handleChangeData} />
                        </div>

                        <div className="form--item">
                            <label className="form--label">Priority <Asterisk /></label>
                            <select className='form--select' required name="priority" value={supportData?.priority} onChange={handleChangeData}>
                                <option type="high">High</option>
                                <option type="medium">Medium</option>
                                <option type="low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="form--item">
                        <label className="form--label">Message <Asterisk /></label>
                        <textarea className="form--input" style={{ minHeight: "20rem" }} placeholder='Type your message' required name="message" value={supportData?.message} onChange={handleChangeData} />
                    </div>

                    <div className="form--item">
                        <p className="form--label info">
                            Attachments <span>Max 5 files can be uploaded. Maximum upload size is 256M</span>
                        </p>

                        <div className='add-file'>
                            <span className='form--input'>
                                <label htmlFor="add-file" className='add-label'>Choose file</label>
                                <p>{attachments?.length == 0 ? "No Choosen File" : attachments.map(file => <>{truncateString(file?.name, 20)},{" "}</>)}</p>
                            </span>
                            <input type="file" name="" id="add-file" accept="*" maxLength={5} onChange={handleAddFiles} />
                            <label htmlFor="add-file" className='form--label'><AiOutlinePlus /> Add new</label>
                        </div>

                        <p className='add-extra'>Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</p>
                    </div>


                    <button className='form--btn btn-next' type='submit' style={{ marginTop: "1rem" }}>Submit</button>
                </form>

            </div>


        </>
    )
}

export default index