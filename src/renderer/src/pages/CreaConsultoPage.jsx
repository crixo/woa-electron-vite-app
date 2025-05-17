import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
//import { VITE_BACKEND_URL } from "../App";

const CreaConsultoPage = () => {
  const [problema_iniziale, setProblemaIniziale] = useState('')
  const [data, setData] = useState('')

  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()
  const { add } = useContext(ConsultoContext)
  const { paziente } = useContext(PazienteContext)

  console.log(paziente)

  const saveConsulto = async (e) => {
    e.preventDefault()
    if (data === '' || problema_iniziale === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      setIsLoading(true)

      const entity = {
        pazienteId: paziente.ID,
        data: data,
        problema_iniziale: problema_iniziale
      }
      let newE = await add(entity)
      console.log(newE)
      toast.success(`save ${newE.tipo} successuflly`, {
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
      <h2 className="font-semibold text-2xl mb-4 block text-center">Create un nuovo Consulto</h2>
      <form onSubmit={saveConsulto}>
        <div className="space-y-2">
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter Data"
          />
        </div>

        <div className="space-y-2">
          <label>Problema Iniziale</label>
          <input
            type="text"
            value={problema_iniziale}
            onChange={(e) => setProblemaIniziale(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter Problema iniziale"
          />
        </div>
        <div>
          {!isLoading && (
            <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
              Crea Consulto
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreaConsultoPage
