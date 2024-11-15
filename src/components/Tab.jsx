import React from 'react'

function Tab({ title, onClick, active }) {
  return (
    <button type='button' className={`page--tab ${active ? "active" : ""}`} onClick={onClick}>{title}</button>
  )
}

export default Tab