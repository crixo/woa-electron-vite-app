import { useState } from 'react'
import { formatDateForFormField } from '../utils/dateUtils'
import { handleFormChange } from '../utils/formUtils';

const AnamnesiRemotaForm = ({ entity, onSubmit, tipi }) => {
  const [formData, setFormData] = useState(entity)

  const handleChange = (e) => handleFormChange(e, formData, setFormData);

  console.log(formData)

  return (
    <form className="form-container"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
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
          <label className="form-label">Tipo</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="form-field"
          >
            <option value="">-- Scegli --</option>
            {tipi.map((tipo) => (
              <option key={tipo.ID} value={tipo.ID}>
                {tipo.descrizione}
              </option>
            ))}            
          </select>
        </div>
        <div className="space-y-2">
          <label className="form-label">Descrizione</label>
          <input
            type="text"
            value={formData.descrizione}
            name="descrizione"
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

export default AnamnesiRemotaForm
