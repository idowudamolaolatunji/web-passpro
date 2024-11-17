import React from 'react'
import { ring } from 'ldrs'

function SpinnerMini() {
    ring.register();
    return (
        <div className='spinner-mini'>
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

export default SpinnerMini