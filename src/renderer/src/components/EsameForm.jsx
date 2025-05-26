import { useState } from 'react'
import { formatDate } from '../utils'

const EsameForm = ({ esame, onSubmit, tipi }) => {
  const [formData, setFormData] = useState(esame)

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
        <label>Data</label>
        <input
          type="date"
          name="data"
          value={formatDate(formData.data)}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Data"
        />
      </div>
      <div className="space-y-2">
        <label>Tipo</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
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
        <label>Descrizione</label>
        <input
          type="text"
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Descrizione"
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

export default EsameForm
