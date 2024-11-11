import React from 'react'
import { Steps } from 'rsuite';

function StepsTab({ step }) {
    return (
        <Steps current={step} small>
            <Steps.Item description="Overview" />
            <Steps.Item description="Gallery" />
            <Steps.Item description="Tickets" />
            <Steps.Item description="Review & Publish" />
        </Steps>
    )
}

export default StepsTab