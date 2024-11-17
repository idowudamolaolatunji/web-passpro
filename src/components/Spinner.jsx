import React from 'react'
import { ring } from 'ldrs'

function Spinner() {
    ring.register();

    return (
        <div className="spinner--container">
            <l-ring
                size="50"
                stroke="5"
                bg-opacity="0"
                speed="2"
                color="#FC6435"
            ></l-ring>
        </div>
    )
}

export default Spinner