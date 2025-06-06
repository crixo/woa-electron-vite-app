import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../contexts/PazienteContext'
import { ConsultoContext } from '../contexts/ConsultoContext'
import ConsultoForm from '../components/ConsultoForm'
import { PazienteCard } from '../components/PazienteCard'
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
  <>
    <PazienteCard paziente={paziente} />
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h3 className="h3-primary">Create un nuovo Consulto</h3>
      <ConsultoForm entity={{ID_paziente:paziente.ID, data:'', problema_iniziale:''}} onSubmit={saveConsulto} />
    </div>
  </>
  )
}

export default CreaConsultoPage
