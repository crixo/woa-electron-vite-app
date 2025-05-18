import { useState } from 'react'

const AnamnesiProssimaForm = ({ entity, onSubmit }) => {
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
        <label>Prima Volta</label>
        <input
          type="text"
          name="prima_volta"
          value={formData.prima_volta}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Prima Volta"
        />
      </div>
      <div className="space-y-2">
        <label>Tipologia</label>
        <input
          type="text"
          name="tipologia"
          value={formData.tipologia}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Tipologia"
        />
      </div>
      <div className="space-y-2">
        <label>Localizzazione</label>
        <input
          type="text"
          name="localizzazione"
          value={formData.localizzazione}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Localizzazione"
        />
      </div>
      <div className="space-y-2">
        <label>Irradiazione</label>
        <input
          type="text"
          name="irradiazione"
          value={formData.irradiazione}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Irradiazione"
        />
      </div>
      <div className="space-y-2">
        <label>Periodo Insorgenza</label>
        <input
          type="text"
          name="periodo_insorgenza"
          value={formData.periodo_insorgenza}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Periodo Insorgenza"
        />
      </div>
      <div className="space-y-2">
        <label>Durata</label>
        <input
          type="text"
          name="durata"
          value={formData.durata}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Durata"
        />
      </div>
      <div className="space-y-2">
        <label>Familiarita'</label>
        <input
          type="text"
          name="familiarita"
          value={formData.familiarita}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Familiarita'"
        />
      </div>
      <div className="space-y-2">
        <label>Altre Terapie</label>
        <input
          type="text"
          name="altre_terapie"
          value={formData.altre_terapie}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Altre Terapie"
        />
      </div>
      <div className="space-y-2">
        <label>Varie</label>
        <input
          type="text"
          name="varie"
          value={formData.varie}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Varie"
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

export default AnamnesiProssimaForm
