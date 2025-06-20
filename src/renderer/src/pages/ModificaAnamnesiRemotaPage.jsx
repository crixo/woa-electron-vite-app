import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PazienteContext } from '../contexts/PazienteContext'
import { useParams } from 'react-router-dom'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
import { persistEntity } from '../utils/formUtils'
//import { VITE_BACKEND_URL } from "../App";

const ModificaAnamnesiRemotaPage = () => {
  const navigate = useNavigate()
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)
  const { id } = useParams() // Extracts the ID from URL
  const entityToUpd = paziente.anamnesiRemote.find(e=>e.ID==id)
  const [entity, setEntity] = useState(entityToUpd)

  const missingMandatoryField = (formData) => {
    return (formData.data === '' || formData.tipo === '' || formData.descrizione === '')
  }

  const saveEntity = async (formData) => {
    if (persistEntity(formData, missingMandatoryField, dal.updateAnamnesiRemota)){
      navigate(`/paziente/${paziente.ID}`)
    }
  }

  return (
    <>
    <PazienteCard paziente={paziente} />
    <h3 className="h3-primary">Modifica Anamnesi Remota</h3>
    <AnamnesiRemotaForm entity={entity} onSubmit={saveEntity} tipi={tipoAnamnesi} />
    </>
  )
}

export default ModificaAnamnesiRemotaPage
