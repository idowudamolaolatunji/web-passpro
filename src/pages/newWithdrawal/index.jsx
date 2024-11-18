import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import NumberInputField from '../../components/NumberInputField'
import Asterisk from '../../components/Asterisk'
import Line from '../../components/Line'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { BiChevronRight } from 'react-icons/bi'
import { useAuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IoCloseCircleOutline } from 'react-icons/io5'
import Spinner from '../../components/Spinner'
import CustomAlert from '../../components/CustomAlert'
import { FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'

function index() {
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { user, headers, token } = useAuthContext();

    const [withdrawalData, setWithdrawalData] = useState({
        amount: "", amount_receivable: "", password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState({
        confirm: false, success: false
    });

    const [response, setResponse] = useState({ status: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleToggleShow = function() {
        setShowPassword(!showPassword);
    }

    const handleChangeData = function (e) {
        const { name, value } = e?.target;

        setWithdrawalData({ ...withdrawalData, [name]: value })
    }

    const handleShowModal = function() {
        if(!withdrawalData?.amount || +withdrawalData?.amount < 1) {
            setResponse({ status: "error", message: "Enter an amount!" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }
        if((user?.balance < withdrawalData?.amount)) {
            setResponse({ status: "error", message: "Insufficient balance!" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }

        setShowModal({ confirm: true });
    }
    

    useEffect(function() {
        if(withdrawalData?.amount && (user?.balance >= withdrawalData?.amount)) {
            setWithdrawalData({...withdrawalData, amount_receivable: withdrawalData?.amount})
        }
    }, [withdrawalData?.amount]);


    async function handleRequestWithdrawal() {
        if(!withdrawalData?.password) {
            setResponse({ status: "error", message: "Enter your password!" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }

        setLoading(true);
        setResponse({ status: "", message: "" });

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/user/request/withdrawal`, {
                method: "POST", headers,
                body: JSON.stringify(withdrawalData)
            });

            const data = await res.json();
            if(!data?.success) {
                throw new Error(data?.message || data?.error)
            }

            setResponse({ status: "success", message: data?.success });
            setShowModal({ success: true })

        } catch(err) {
            setResponse({ status: "error", message: err?.message });
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {showModal?.confirm && (
                <Modal className="mini" handleClose={() => setShowModal({ confirm: false })}>
                    <div className="modal--details">
                        <span className='close--icon' onClick={() => setShowModal({ confirm: false })}>
                            <IoCloseCircleOutline  />
                        </span>

                        <h4>You are withdrawing 1,000,000. please enter your password to confirm withdrawal</h4>
                        <div className='form--input-box'>
                            <input type={showPassword ? "password" : "text"} name='password' className='form--input' placeholder='Enter password' value={withdrawalData?.password} onChange={handleChangeData}  />
                            <span className='form--input-icon' onClick={handleToggleShow}>{showPassword ? <ImEye /> : <ImEyeBlocked />}</span>
                        </div>

                        <button className='form--btn btn-next' onClick={handleRequestWithdrawal}>Confirm Withdrawal</button>
                    </div>
                </Modal>
            )}


            {showModal?.success && (
                <Modal className="mini" handleClose={() => setShowModal({ success: false })}>
                    <div className="modal--details">
                        <span className='close--icon' onClick={() => setShowModal({ confirm: false })}>
                            <IoCloseCircleOutline  />
                        </span>

                        <span className='modal--top'>
                            <FiCheckCircle />
                            <h3>Successful</h3>
                        </span>

                        <p style={{ fontSize: "1.5rem" }}>Withdrawal Successful!</p>

                        <button className='form--btn btn-next' onClick={() => navigate("/")}>Proceed to dashboard</button>
                    </div>
                </Modal>
            )}

            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <PageTop title="New Withdrawal" />

            <div className="form__container">
                <div className={`form--click click-left is-selected`} style={{ width: "fit-content", gap: ".8rem", borderLeft: "1." }}>
                    <span></span>Bank Tansfer
                </div>

                <div className="form withdrawal--form">
                    <div className="inform--item">
                        <label className='form--label' style={width > 450 ? { marginBottom: "1.8rem" } :{}}>Amount <Asterisk /></label>

                        <div style={{ width: "100%" }}>
                            <NumberInputField prefix placeholder="₦0.00" name="amount" value={withdrawalData?.amount} onChange={handleChangeData} />
                            <span className="form--error-message">
                                {(user?.balance < withdrawalData?.amount) && "Insufficient balance"}
                            </span>
                        </div>
                    </div>

                    <Line color='#D9D9D9' />

                    <div className="form--grid">
                        <label className="form--label" style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>Processing fee <IoIosInformationCircleOutline /></label>
                        <label className="form--label" style={{ color: "#888", justifySelf: "end" }}>0.1% of ₦10,000</label>
                    </div>

                    <Line color='#D9D9D9' />

                    <div className="inform--item">
                        <label className='form--label'>Amount Recievable</label>
                        <NumberInputField readOnly prefix placeholder="₦0.00" name="amount_receivable" value={withdrawalData?.amount_receivable} onChange={handleChangeData} />
                    </div>

                    <button className='form--btn btn-next' type='button' style={{ marginTop: "1rem" }} onClick={handleShowModal}>Make Withdrawal <BiChevronRight /></button>
                    <p className='add-extra'>Safely withdraw your funds using our highly secured checkout process and
                        seamless</p>
                </div>
            </div>
        </>
    )
}

export default index