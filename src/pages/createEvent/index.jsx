import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import StepsTab from '../../components/StepsTab'
import MainDropdownSelect from '../../components/MainDropdownSelect';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import TabOne from './eventTabs/TabOne';
import TabTwo from './eventTabs/TabTwo';
import TabThree from './eventTabs/TabThree';

function index() {
    const [step, setStep] = useState(1);

    const [images, setImages] = ([
    ])
    const [eventData, setEventData] = useState({

    });

    const [ticketsData, setTicketsData] = useState([

    ]);
    

    const handlePrevStep = function() {
        if(step > 1) {
            setStep(step - 1);
        } 
    }

    const handleNextStep = function() {
        if(step < 3) {
            setStep(step + 1);
        }
    }

    useEffect(function() {
        window.scrollTo(0, 0);
    }, [step]);

    

  return (
    <section>
        <PageTop title="Create Event" />

        <main className="form__comtainer">
            <StepsTab step={step} />

            <span className="form__container--headiing">Overview</span>

            {step == 1 && <TabOne setEventData={setEventData} eventData={eventData} />}
            {step == 2 && <TabTwo setImages={setImages} images={images} />}
            {step == 3 && <TabThree setTicketsData={setTicketsData} ticketsData={ticketsData} />}



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