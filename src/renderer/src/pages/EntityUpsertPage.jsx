import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PazienteContext } from '../contexts/PazienteContext'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
import { persistEntity } from '../utils/formUtils'
import { useParams } from 'react-router-dom'
//import { VITE_BACKEND_URL } from "../App";

const EntityUpsertPage = () => {
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)
  const navigate = useNavigate()
  const { id, entityType } = useParams() // Extracts the ID from URL
  //const entity = id? paziente.anamnesiRemote.find(e=>e.ID==id) : {ID_paziente:paziente.ID }
  //const pageTitle = id? "Modifica Anamnesi Remota" : 'Crea nuova Anamnesi Remota'

  const entityMapper = {
    anamnesiRemota: {
      instanceFinder: (id) =>id? paziente.anamnesiRemote.find(e=>e.ID==id) : {ID_paziente:paziente.ID },
      pageTitle: (id) => id? "Modifica Anamnesi Remota" : 'Crea nuova Anamnesi Remota',
      dalMethod: (id) => id? dal.updateAnamnesiRemota : dal.addAnamnesiRemota,
      missingMandatoryField: (formData) => (formData.data === '' || !formData.tipo || !formData.descrizione),
      component: AnamnesiRemotaForm,
    }
  }

  console.log(id, entityType)

  const entityMapped = entityMapper[entityType]
  const FormComponent = entityMapped.component
  const entity = entityMapped.instanceFinder(id)
  const missingMandatoryField = entityMapped.missingMandatoryField
  const dalMethod = entityMapped.dalMethod(id)
  const pageTitle = entityMapped.pageTitle(id)

  const saveEntity = async (formData) => {
    if (persistEntity(
          formData, 
          missingMandatoryField, 
          dalMethod)){
      navigate(`/paziente/${paziente.ID}`)
    }
  }

  return (
    <>
    <PazienteCard paziente={paziente} />
    <h3 className="h3-primary">{pageTitle}</h3>
    <FormComponent entity={entity} onSubmit={saveEntity} tipi={tipoAnamnesi} />
    </>
  )
}

export default EntityUpsertPage
