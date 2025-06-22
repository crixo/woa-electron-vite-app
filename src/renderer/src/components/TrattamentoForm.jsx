import { useState } from 'react'
import { formatDateForFormField } from '../utils/dateUtils'
import { handleFormChange, submitIfFormDataAreValid } from '../utils/formUtils'

const TrattamentoForm = ({ entity, onSubmit }) => {
  const [formData, setFormData] = useState(entity)

  const handleChange = (e) => handleFormChange(e, formData, setFormData);
  const missingMandatoryField = (formData) => (!formData.data || !formData.descrizione)

  return (
    <form className='form-container'
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
        <label className="form-label">Descrizione</label>
        <input
          type="text"
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Descrizione"
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

export default TrattamentoForm
