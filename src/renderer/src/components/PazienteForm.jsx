import { useEffect, useState } from 'react'
import { formatDateForFormField } from '../utils/dateUtils'
import { handleFormChange } from '../utils/formUtils';

const PazienteForm = ({ paziente, onSubmit }) => {
  const [formData, setFormData] = useState(paziente)

  const handleChange = (e) => handleFormChange(e, formData, setFormData);

  useEffect(() => {
      console.log(formData.data_nascita)
    }, [formData]
  )

  return (
    <form className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <div className="space-y-2">
        <label className="form-label">Nome</label>
        <input
          type="text"
          value={formData.nome}
          name="nome"
          onChange={handleChange}
          className="form-field"
          placeholder="enter Nome"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Cognome</label>
        <input
          type="text"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Cognome"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Professione</label>
        <input
          type="text"
          name="professione"
          value={formData.professione}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Professione"
        />
      </div>      
      <div className="space-y-2">
        <label className="form-label">Indirizzo</label>
        <input
          type="text"
          name="indirizzo"
          value={formData.indirizzo}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Indirizzo"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Citta'</label>
        <input
          type="text"
          name="citta"
          value={formData.citta}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Citta'"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Provincia</label>
        <input
          type="text"
          name="prov"
          value={formData.prov}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Provincia"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">CAP</label>
        <input
          type="text"
          name="cap"
          value={formData.cap}
          onChange={handleChange}
          className="form-field"
          placeholder="enter CAP"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Telefono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Telefono"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Cellulare</label>
        <input
          type="text"
          name="cellulare"
          value={formData.cellulare}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Cellulare"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Email"
        />
      </div>
      <div className="space-y-2">
        <label className="form-label">Data di Nascita</label>
        <input
          type="date"
          name="data_nascita"
          value={formatDateForFormField(formData.data_nascita)}
          onChange={handleChange}
          className="form-field"
          placeholder="enter Data di Nascita"
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

export default PazienteForm
