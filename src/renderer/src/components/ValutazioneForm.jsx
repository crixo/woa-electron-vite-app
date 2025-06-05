import { useState } from 'react'

const ValutazioneForm = ({ entity, onSubmit }) => {
  const [formData, setFormData] = useState(entity)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  console.log(formData)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <div className="space-y-2">
        <label className="form-label">Strutturale</label>
        <input
          type="text"
          name="strutturale"
          value={formData.strutturale}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Strutturale"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Cranio-Sacrale</label>
        <input
          type="text"
          name="cranio_sacrale"
          value={formData.cranio_sacrale}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Cranio-Sacrale"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">AK Ortodontica</label>
        <input
          type="text"
          name="ak_ortodontica"
          value={formData.ak_ortodontica}
          onChange={handleChange}
          className="form-field"
          placeholder="enter AK Ortodontica"
        />
      </div>
      <div>
        <button className="form-button">
          Salva
        </button>
        </div>
    </form>
  )
}

export default ValutazioneForm
