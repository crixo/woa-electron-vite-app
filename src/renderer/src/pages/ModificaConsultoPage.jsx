import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../contexts/PazienteContext'
import { ConsultoContext } from '../contexts/ConsultoContext'
import { PazienteCard } from '../components/PazienteCard'
import ConsultoForm from '../components/ConsultoForm'
import { useParams } from 'react-router-dom'
//import { VITE_BACKEND_URL } from "../App";

const ModificaConsultoPage = () => {
  const [problema_iniziale, setProblemaIniziale] = useState('')
  const [data, setData] = useState('')

  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()
  const { update } = useContext(ConsultoContext)
  const { paziente } = useContext(PazienteContext)

  const { id } = useParams() // Extracts the ID from URL
  console.log(id)
  //const [anamnesiRemote, setAnamnesiRemote] = useState(paziente.anamnesiRemote)
  const entityToUpd = paziente.consulti.find(e=>e.ID==id)
  const [entity, setEntity] = useState(entityToUpd)
  console.log(entity)


  const saveEntity = async (formData) => {
    if (formData.data === '' || formData.problema_iniziale === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      setIsLoading(true)
      await update(formData)
      toast.success(`Consulto del ${formData.data} updated successuflly`, {
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
    <h3 className="h3-primary">Modifica Consulto</h3>
    <ConsultoForm entity={entity} onSubmit={saveEntity} />
    </>
  )  
}

export default ModificaConsultoPage
