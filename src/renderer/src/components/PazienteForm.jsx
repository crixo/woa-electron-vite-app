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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <div className="space-y-2">
        <label>Nome</label>
        <input
          type="text"
          value={formData.nome}
          name="nome"
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Nome"
        />
      </div>
      <div className="space-y-2">
        <label>Cognome</label>
        <input
          type="text"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Cognome"
        />
      </div>
      <div className="space-y-2">
        <label>Professione</label>
        <input
          type="text"
          name="professione"
          value={formData.professione}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Professione"
        />
      </div>      
      <div className="space-y-2">
        <label>Indirizzo</label>
        <input
          type="text"
          name="indirizzo"
          value={formData.indirizzo}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Indirizzo"
        />
      </div>
      <div className="space-y-2">
        <label>Citta'</label>
        <input
          type="text"
          name="citta"
          value={formData.citta}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Citta'"
        />
      </div>
      <div className="space-y-2">
        <label>Provincia</label>
        <input
          type="text"
          name="prov"
          value={formData.prov}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Provincia"
        />
      </div>
      <div className="space-y-2">
        <label>CAP</label>
        <input
          type="text"
          name="cap"
          value={formData.cap}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter CAP"
        />
      </div>
      <div className="space-y-2">
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Telefono"
        />
      </div>
      <div className="space-y-2">
        <label>Cellulare</label>
        <input
          type="text"
          name="cellulare"
          value={formData.cellulare}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Cellulare"
        />
      </div>
      <div className="space-y-2">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Email"
        />
      </div>
      <div className="space-y-2">
        <label>Data di Nascita</label>
        <input
          type="date"
          name="data_nascita"
          value={formatDateForFormField(formData.data_nascita)}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Data di Nascita"
        />
      </div>
      <div>
        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
          Salva
        </button>
        </div>
    </form>
  )
}

export default PazienteForm
