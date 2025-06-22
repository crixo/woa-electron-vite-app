import { useState } from 'react'
import { submitIfFormDataAreValid } from '../utils/formUtils'

const AnamnesiProssimaForm = ({ entity, onSubmit }) => {
  const [formData, setFormData] = useState(entity)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const missingMandatoryField = (formData) => (!formData.prima_volta)


  console.log(formData)

  return (
    <form className="form-container"
      onSubmit={(e) => {
        e.preventDefault()
        submitIfFormDataAreValid(formData, onSubmit, missingMandatoryField)
      }}
    >
      <div className="space-y-2">
        <label className="form-label">Prima Volta</label>
        <input
          type="text"
          name="prima_volta"
          value={formData.prima_volta}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Prima Volta"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Tipologia</label>
        <input
          type="text"
          name="tipologia"
          value={formData.tipologia}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Tipologia"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Localizzazione</label>
        <input
          type="text"
          name="localizzazione"
          value={formData.localizzazione}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Localizzazione"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Irradiazione</label>
        <input
          type="text"
          name="irradiazione"
          value={formData.irradiazione}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Irradiazione"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Periodo Insorgenza</label>
        <input
          type="text"
          name="periodo_insorgenza"
          value={formData.periodo_insorgenza}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Periodo Insorgenza"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Durata</label>
        <input
          type="text"
          name="durata"
          value={formData.durata}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Durata"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Familiarita'</label>
        <input
          type="text"
          name="familiarita"
          value={formData.familiarita}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Familiarita'"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Altre Terapie</label>
        <input
          type="text"
          name="altre_terapie"
          value={formData.altre_terapie}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Altre Terapie"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Varie</label>
        <input
          type="text"
          name="varie"
          value={formData.varie}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Varie"
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

export default AnamnesiProssimaForm
