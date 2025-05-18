import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
import ConsultoForm from '../components/ConsultoForm'
//import { VITE_BACKEND_URL } from "../App";

const CreaConsultoPage = () => {
  const [problema_iniziale, setProblemaIniziale] = useState('')
  const [data, setData] = useState('')

  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()
  const { add } = useContext(ConsultoContext)
  const { paziente } = useContext(PazienteContext)


  console.log(paziente)

  const saveConsulto = async (formData) => {
    if (formData.data === '' || formData.problema_iniziale === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      setIsLoading(true)

      let newConsulto = await add(formData)
      console.log(newConsulto)
      console.log('nuovo consulto'+newConsulto)
      toast.success(`save ${newConsulto.tipo} successuflly`, {
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
      <ConsultoForm consulto={{ID_paziente:paziente.ID, data:'', problema_iniziale:''}} onSubmit={saveConsulto} />
    </div>
  )
}

export default CreaConsultoPage
