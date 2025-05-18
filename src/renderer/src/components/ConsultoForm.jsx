import { useState } from 'react'

const ConsultoForm = ({ consulto, onSubmit }) => {
  const [formData, setFormData] = useState(consulto)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  console.log(formData)

  const formatDate = (dateString) => {
    if (dateString === undefined || dateString=="") return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Extracts yyyy-MM-dd
  }

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
        <label>Problema Iniziale</label>
        <input
          type="text"
          value={formData.problema_iniziale}
          name="problema_iniziale"
          onChange={handleChange}
          className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
          placeholder="enter Problema Iniziale"
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

export default ConsultoForm
