import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import StepsTab from '../../components/StepsTab'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import TabOne from './eventTabs/TabOne';
import TabTwo from './eventTabs/TabTwo';
import TabThree from './eventTabs/TabThree';
import Modal from '../../components/Modal';
import TicketForm from './eventTabs/TicketForm';
import EventPreview from '../../components/EventPreview';
import CustomAlert from '../../components/CustomAlert';
import { useAuthContext } from '../../context/AuthContext';
import { validateEventForm } from '../../utils/helper';
import Spinner from '../../components/Spinner';
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


function index() {
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;
    const { token, shouldKick } = useAuthContext();
    const { width } = useWindowSize();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [response, setResponse] = useState({ status: "", message: "" });
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState({
        event_image: { file: null, preview: null },
        cover_photo: { file: null, preview: null }
    });

    const [eventData, setEventData] = useState({
        category_id: "",
        event_name: "",
        event_description: "",
        featured: false,
        event_type: "",
        event_location: "",
        start_date: "",
        start_date_time: "",
        end_date: "",
        end_date_time: "",
        tickets: [],
    });

    const handleShowTicketModal = function () {
        setShowTicketModal(!showTicketModal);
    }

    const handleRemoveTicket = function (id) {
        setEventData({ ...eventData, tickets: eventData.tickets.filter(ticket => ticket?.ticket_id != id) });
    }

    const handlePrevStep = function () {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleNextStep = function () {
        const error = validateEventForm(eventData);
        if (step == 1 && Object.keys(error).length > 1) {
            setResponse({ status: "error", message: "Fill required fields to proceed!" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        } else if(Object.keys(error).length == 1) {
            const errMessage = Object.values(error)[0];
            setResponse({ status: "error", message: errMessage });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }

        if (step == 2 && (!images?.cover_photo.file && !images?.event_image.file)) {
            setResponse({ status: "error", message: "Choose both images for the event" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }
        if (step == 3 && eventData.tickets.length == 0) {
            setResponse({ status: "error", message: "There must be at least 1 ticket" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        };

        if (step < 4) {
            setStep(step + 1);
        } else {
            handleSubmit()
        }
    }

    const handleCloseModal = function () {
        setShowTicketModal(false)
    }

    useEffect(function () {
        window.scrollTo(0, 0);
    }, [step]);

    async function handleSubmit() {
        setLoading(true);

        console.log(eventData)

        const formData = new FormData();
        formData.append('event_name', eventData.event_name);
        formData.append('category_id', eventData.category_id);
        formData.append('event_description', eventData.event_description);
        formData.append('event_type', eventData.event_type);
        formData.append('event_location', eventData.event_location);
        formData.append('start_date', eventData.start_date);
        formData.append('end_date', eventData.end_date);
        formData.append('start_date_time', eventData.start_date_time);
        formData.append('end_date_time', eventData.end_date_time);
        // const formattedStartTime = moment(eventData.start_date_time).format('HH:mm');
        // const formattedEndTime = moment(eventData.end_date_time).format('HH:mm');
        
        // formData.append('start_date_time', formattedStartTime);
        // formData.append('end_date_time', formattedEndTime);

        
        formData.append('tickets', JSON.stringify(eventData.tickets));

        formData.append('cover_photo', images.cover_photo.file);
        formData.append('event_image', images.event_image.file);

        setResponse({ status: "", message: "" });

        try {
            const res = await fetch(`${BASE_URL}/events`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            shouldKick(res);

            const data = await res.json();
            if(res.status != 201) {
                throw new Error(data?.message || data?.error)
            }

            setResponse({ status: "success", message: data?.message });
            setTimeout(() => navigate("/dashboard/events/manage"), 2000);
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

            {showTicketModal && (
                <Modal handleClose={handleCloseModal} className="modal-add">
                    <TicketForm setEventData={setEventData} handleClose={handleCloseModal} setResponse={setResponse} />
                </Modal>
            )}

            <PageTop title="Create Event" />

            <div className="form__container event--form">
                <StepsTab step={step} />

                {step == 1 && <TabOne setEventData={setEventData} eventData={eventData} />}

                {step == 2 && <TabTwo setImages={setImages} images={images} />}

                {step == 3 && <TabThree eventData={eventData} handleDelete={handleRemoveTicket} handleShowModal={handleShowTicketModal} />}

                {step == 4 && <EventPreview eventData={eventData} cover_photo={images?.cover_photo?.preview} event_image={images?.event_image?.preview} />}

                <div className="form--actions">
                    {step > 1 && (
                        <button className='form--btn btn-prev' type='button' onClick={handlePrevStep}><BiChevronLeft /> Previous </button>
                    )}
                    <button className='form--btn btn-next' type='button' onClick={handleNextStep}>{step == 4 ? "Submit" : (width < 600 && step != 1) ? "Continue" : "Save and Continue"} <BiChevronRight /></button>
                </div>
            </div>
        </>
    )
}

export default index