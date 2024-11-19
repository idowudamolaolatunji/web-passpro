import React from 'react'
import CurrencyInput from 'react-currency-input-field'

function NumberInputField({ name, prefix, placeholder, value, onChange, readOnly, decimalsLimit=0 }) {
  return (
    <CurrencyInput
    min={1}
      name={name}
      readOnly={readOnly}
      className="form--input"
      placeholder={placeholder}
      prefix={prefix ? "₦" : ""}
      decimalsLimit={decimalsLimit}
      value={value}
      onValueChange={(value, name, _) => onChange({ target: {value, name} })}
    />
  )
}

export default NumberInputField