import React from 'react'

import { orbit } from 'ldrs'

function Spinner() {
    orbit.register()
    return (
        <div className="spinner--container">
            <l-orbit
                size="45"
                stroke="3.5"
                speed="1.4"
                color="#FC6435"
            ></l-orbit>
        </div>
    )
}

export default Spinner