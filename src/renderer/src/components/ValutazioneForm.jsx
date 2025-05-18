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
        <label>Strutturale</label>
        <input
          type="text"
          name="strutturale"
          value={formData.strutturale}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Strutturale"
        />
      </div>
      <div className="space-y-2">
        <label>Cranio-Sacrale</label>
        <input
          type="text"
          name="cranio_sacrale"
          value={formData.cranio_sacrale}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Cranio-Sacrale"
        />
      </div>
      <div className="space-y-2">
        <label>AK Ortodontica</label>
        <input
          type="text"
          name="ak_ortodontica"
          value={formData.ak_ortodontica}
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter AK Ortodontica"
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

export default ValutazioneForm
