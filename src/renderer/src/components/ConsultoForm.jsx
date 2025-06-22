import { useState } from 'react'
import { formatDateForFormField } from '../utils/dateUtils'
import { handleFormChange, submitIfFormDataAreValid } from '../utils/formUtils'

const ConsultoForm = ({ entity, onSubmit }) => {
  const [formData, setFormData] = useState(entity)

  const handleChange = (e) => handleFormChange(e, formData, setFormData)
  const missingMandatoryField = (formData) => (!formData.data || !formData.problema_iniziale)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitIfFormDataAreValid(formData, onSubmit, missingMandatoryField)
      }}
    >
      <div className="space-y-2">
        <label className="form-label">Data</label>
        <input
          type="date"
          name="data"
          value={formatDateForFormField(formData.data)}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Data"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Problema Iniziale</label>
        <input
          type="text"
          value={formData.problema_iniziale}
          name="problema_iniziale"
          onChange={handleChange}
          className="form-field"
          placeholder="enter Problema Iniziale"
        />
      </div>
      <div className="flex justify-center">
        <button className="form-button">
          Salva
        </button>
      </div>
    </form>
  )
}

export default ConsultoForm
