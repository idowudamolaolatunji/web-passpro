import React from 'react'
import CurrencyInput from 'react-currency-input-field'

function NumberInputField({ name, prefix, placeholder, value, onChange }) {
  return (
    <CurrencyInput
      id="price"
      name={name}
      className="form--input"
      placeholder={placeholder}
      prefix={prefix ? "₦" : ""}
      decimalsLimit={0}
      value={value}
      onValueChange={(value, name, _) => onChange({ target: {value, name} })}
    />
  )
}

export default NumberInputField