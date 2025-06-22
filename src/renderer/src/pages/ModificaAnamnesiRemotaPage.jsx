import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PazienteContext } from '../contexts/PazienteContext'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
import { persistEntity } from '../utils/formUtils'
import { useParams } from 'react-router-dom'
//import { VITE_BACKEND_URL } from "../App";

const ModificaAnamnesiRemotaPage = () => {
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)
  const navigate = useNavigate()
  const { id } = useParams() // Extracts the ID from URL
  const entity = paziente.anamnesiRemote.find(e=>e.ID==id)

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
