import React from 'react'
import { FiSearch } from 'react-icons/fi'

function TableSearch({ title, value, setValue, action }) {
  return (
    <div className='table--search-box'>
        <input type="text" className='form--input' placeholder={'Search ' + title} value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={action}><FiSearch /></button>
    </div>
  )
}

export default TableSearch