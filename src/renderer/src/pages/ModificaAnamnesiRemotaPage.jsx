import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import { AnamnesiRemotaContext } from '../data/AnamnesiRemotaContext'
import { useParams } from 'react-router-dom'
//import { VITE_BACKEND_URL } from "../App";

const ModificaAnamnesiRemotaPage = () => {
  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()
  const { update } = useContext(AnamnesiRemotaContext)
  const { paziente } = useContext(PazienteContext)

  const { id } = useParams() // Extracts the ID from URL
  console.log(paziente)
  //const [anamnesiRemote, setAnamnesiRemote] = useState(paziente.anamnesiRemote)
  const arToUpd = paziente.anamnesiRemote.find(e=>e.ID==id)
  const [entity, setEntity] = useState(arToUpd)
  console.log(entity)

  const handleChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value })
  }

  const saveAnamnesiRemota = async (e) => {
    e.preventDefault()
    if (entity.data === '' || entity.tipo === '' || entity.descrizione === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      setIsLoading(true)
      await update(entity)
      toast.success(`save ${entity.tipo} successuflly`, {
        position: 'top-center'
      })

      setIsLoading(false)
      navigate('/paziente/' + paziente.ID)
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })

      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Modifca Anamnesi Remota
      </h2>
      <form onSubmit={saveAnamnesiRemota}>
        <div className="space-y-2">
          <label>Data</label>
          <input
            type="date"
            name='data'
            value={entity.data}
            onChange={handleChange}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter Data"
          />
        </div>

        <div className="space-y-2">
          <label>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={entity.tipo}
            onChange={handleChange}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter Tipo"
          />
        </div>
        <div className="space-y-2">
          <label>Descrizione</label>
          <input
            type="text"
            name="descrizione"
            value={entity.descrizione}
            onChange={handleChange}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter Descrizione"
          />
        </div>
        <div>
          {!isLoading && (
            <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
              Modifica Anamnesi Remota
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ModificaAnamnesiRemotaPage
