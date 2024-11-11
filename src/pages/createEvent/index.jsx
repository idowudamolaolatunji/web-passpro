import React, { useState } from 'react'
import PageTop from '../../components/PageTop'
import StepsTab from '../../components/StepsTab'

function index() {
    const [step, setStep] = useState(3);
  return (
    <section>
        <PageTop title="Create Event" />

        <form className="form__comtainer">
            <StepsTab step={step} />

            <span className="form__container--headiing">Overview</span>

        </form>
    </section>
  )
}

export default index