import { useState, useEffect } from 'react'
import React from 'react'
import { formatDateAsSettings, formatDateForFormField } from '../utils/dateUtils'
import { handleFormChange } from '../utils/formUtils'

const PazienteForm = ({ entity, onSubmit, fields }) => {
  const [formData, setFormData] = useState(entity)
  const handleChange = (e) => handleFormChange(e, formData, setFormData)




  return (
    <form className="form-container"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      {fields.map( (f) => {

      })}
    {fields.map((field, index) => (
      <div className="space-y-2" key={index}>
        <label className="form-label">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.kind === 'select' ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="form-field"
          >
            <option value="">-- Scegli --</option>
            {field.options.map((tipo) => (
              <option key={tipo.ID} value={tipo.ID}>
                {tipo.descrizione}
              </option>
            ))}
          </select>
        ) : (
          React.createElement(field.kind, {
            type: field.type,
            name: field.name,
            value: (field.type=='date'? formatDateForFormField(formData[field.name]): formData[field.name]),
            onChange: handleChange,
            className: 'form-field',
            placeholder: `enter ${field.name}`,
          })
        )}
      </div>
    ))}
      <div className="flex justify-center">
        <button className="form-button">
          Salva
        </button>
      </div>
    </form>
  )
}

export default PazienteForm
