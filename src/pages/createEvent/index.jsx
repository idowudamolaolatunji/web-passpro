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

function index() {
    const [step, setStep] = useState(1);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [response, setResponse] = useState({ status: "", message: "" });

    const [images, setImages] = useState({
        event_image: { file: "", preview: "" },
        cover_photo: { file: "", preview: "" }
    });

    const [eventData, setEventData] = useState({
        category_id: 2,
        event_name: "Tech Conference 2024",
        event_description: "A conference for tech enthusiasts, developers, and entrepreneurs to network and learn about the latest trends in technology.",
        status: "Pending",
        featured: false,
        price: 99.99,
        event_type: "physical",
        event_location: "Tech Arena, Downtown City",
        start_date: "2024-12-01",
        start_date_time: "09:00:00",
        end_date: "2024-12-01",
        end_date_time: "18:00:00",
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
            setResponse({ status: "error", message: "Choose Both images for the event" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        }
        if(step == 3 && eventData.tickets.length == 0) {
            setResponse({ status: "error", message: "There must be at least 1 ticket" });
            return setTimeout(() => setResponse({ status: "", message: "" }), 2000);
        };

        if (step < 4) {
            setStep(step + 1);
        }
    }

    const handleCloseModal = function() {
        setShowTicketModal(false)
    }

    useEffect(function () {
        window.scrollTo(0, 0);
    }, [step]);



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