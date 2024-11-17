import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import StepsTab from '../../components/StepsTab'
import MainDropdownSelect from '../../components/MainDropdownSelect';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import TabOne from './eventTabs/TabOne';
import TabTwo from './eventTabs/TabTwo';
import TabThree from './eventTabs/TabThree';
import Modal from '../../components/Modal';
import TicketForm from './eventTabs/TicketForm';
import TabPreview from './eventTabs/TabPreview';
import CustomAlert from '../../components/CustomAlert';
import { useFetchedContext } from '../../context/FetchedContext';

function index() {
    const [step, setStep] = useState(1);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [response, setResponse] = useState({ status: "", message: "" });
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState({
        event_image: { file: "", preview: "" },
        cover_photo: { file: "", preview: "" }
    });

    const [eventData, setEventData] = useState({
        category_id: null,
        event_name: "",
        event_description: "",
        status: "",
        featured: false,
        price: "",
        event_type: "",
        event_location: "",
        start_date: "",
        start_date_time: "",
        end_date: "",
        end_date_time: "",
        cover_photo: "path_to_cover_photo.jpg",
        event_image: "path_to_event_image.jpg",
        tickets: [],
    });

    const handleShowTicketModal = function() {
        setShowTicketModal(!showTicketModal);
    }

    const handleRemoveTicket = function(id) {
        setEventData({...eventData, tickets: eventData.tickets.filter(ticket => ticket?.ticket_id != id) });
    }

    const handlePrevStep = function () {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleNextStep = function () {
        if(step == 2 && (!images?.cover_photo.file && !images?.event_image.file)) {
            setResponse({ status: "error", message: "Choose both images for the event" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }
        if(step == 3 && eventData.tickets.length == 0) {
            setResponse({ status: "error", message: "There must be at least 1 ticket" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        };

        if (step < 4) {
            setStep(step + 1);
        } else {
            handleSubmit()
        }
    }

    const handleCloseModal = function() {
        setShowTicketModal(false)
    }

    useEffect(function () {
        window.scrollTo(0, 0);
    }, [step]);

    
    async function handleSubmit() {
        setLoaing(true);
        try {
            const res = await fetch()
        } catch(err) {

        } finally {
            setLoaing(false);
        }
    }


    return (
        <>
            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            {showTicketModal && (
                <Modal handleClose={handleCloseModal} className="modal-add">
                    <TicketForm setEventData={setEventData} handleClose={handleCloseModal} />
                </Modal>
            )}

            <PageTop title="Create Event" />

            <main className="form__container">
                <StepsTab step={step} />

                {step == 1 && <TabOne setEventData={setEventData} eventData={eventData} />}

                {step == 2 && <TabTwo setImages={setImages} images={images} />}

                {step == 3 && <TabThree eventData={eventData} handleDelete={handleRemoveTicket} handleShowModal={handleShowTicketModal} />}
                
                {step == 4 && <TabPreview eventData={eventData} images={images} />}

                <div className="form--actions">
                    {step > 1 && (
                        <button className='form--btn btn-prev' type='button' onClick={handlePrevStep}><BiChevronLeft /> Previous </button>
                    )}
                    <button className='form--btn btn-next' type='button' onClick={handleNextStep}>{ step == 4 ? "Submit" : "Save and Continue"} <BiChevronRight /></button>
                </div>
            </main>
        </>
    )
}

export default index