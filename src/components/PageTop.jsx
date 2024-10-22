import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function PageTop({ title }) {
    return (
        <div className='page__section--top'>
            <h3 className='page__section--heading'>{title}</h3>
            <span className='page__section--crumbs'>
                <Link to="/">Home</Link>
                <BiChevronRight />
                <p>{title}</p>
            </span>
        </div>
    )
}

export default PageTop