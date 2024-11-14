import React from 'react'
import CurrencyInput from 'react-currency-input-field'

function NumberInputField({ prefix, placeholder, value, handleSetData }) {
  return (
    <CurrencyInput
      id="price"
      name="price"
      className="form--input"
      placeholder={placeholder}
      prefix={prefix ? "₦" : ""}
      decimalsLimit={0}
      value={value}
      onValueChange={(value, name, _) => handleSetData(value, name)}
    />
  )
}

export default NumberInputField