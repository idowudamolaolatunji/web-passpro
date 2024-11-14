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

function index() {
    const [step, setStep] = useState(3);
    const [showTicketModal, setShowTicketModal] = useState(true);

    const [images, setImages] = ([
    ])
    const [eventData, setEventData] = useState({

    });

    const [ticketsData, setTicketsData] = useState([]);


    const handlePrevStep = function () {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleNextStep = function () {
        if (step < 3) {
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
        <section>
            {showTicketModal && (
                <Modal handleClose={handleCloseModal} className="modal-add">
                    <TicketForm setTicketsData={setTicketsData} handleClose={handleCloseModal} />
                </Modal>
            )}

            <PageTop title="Create Event" />

            <main className="form__container">
                <StepsTab step={step} />

                {step == 1 && <TabOne setEventData={setEventData} eventData={eventData} />}
                {step == 2 && <TabTwo setImages={setImages} images={images} />}
                {step == 3 && <TabThree ticketsData={ticketsData} showModal={showTicketModal} setShowModal={setShowTicketModal} />}

                <div className="form--actions">
                    {step > 1 && (
                        <button className='form--btn btn-prev' type='button' onClick={handlePrevStep}><BiChevronLeft /> Previous </button>
                    )}
                    <button className='form--btn btn-next' type='button' onClick={handleNextStep}>Save and Continue <BiChevronRight /></button>
                </div>
            </main>
        </section>
    )
}

export default index