import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import { AnamnesiRemotaContext } from '../data/AnamnesiRemotaContext'
import { useParams } from 'react-router-dom'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
//import { VITE_BACKEND_URL } from "../App";

const ModificaAnamnesiRemotaPage = () => {
  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()
  const { update } = useContext(AnamnesiRemotaContext)
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)

  const { id } = useParams() // Extracts the ID from URL
  console.log(id)
  //const [anamnesiRemote, setAnamnesiRemote] = useState(paziente.anamnesiRemote)
  const entityToUpd = paziente.anamnesiRemote.find(e=>e.ID==id)
  const [entity, setEntity] = useState(entityToUpd)
  console.log(entity)



  const saveEntity = async (formData) => {
    if (formData.data === '' || formData.tipo === '') {// || formData.descrizione === ''
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      setIsLoading(true)
      await update(formData)
      toast.success(`Anamnesi Remota del ${formData.data} added successuflly`, {
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
    <h2 className="ext-xl font-semibold text-blue-700 mb-2">Modifica Anamnesi Remota</h2>
    <AnamnesiRemotaForm entity={entity} onSubmit={saveEntity} tipi={tipoAnamnesi} />
    </>
  )
}

export default ModificaAnamnesiRemotaPage
