import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PazienteContext } from '../contexts/PazienteContext'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
import { persistEntity } from '../utils/formUtils'
//import { VITE_BACKEND_URL } from "../App";

const CreaAnamnesiRemotaPage = () => {
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)
  const navigate = useNavigate()

  const missingMandatoryField = (formData) => {
    return (formData.data === '' || formData.tipo === '' || formData.descrizione === '')
  }

  const saveEntity = async (formData) => {
    if (persistEntity(formData, missingMandatoryField, dal.addAnamnesiRemota)){
      navigate(`/paziente/${paziente.ID}`)
    }
  }

  return (
    <>
    <PazienteCard paziente={paziente} />
    <h3 className="h3-primary">Crea nuova Anamnesi Remota</h3>
    <AnamnesiRemotaForm entity={{ID_paziente:paziente.ID }} onSubmit={saveEntity} tipi={tipoAnamnesi} />
    </>
  )
}

export default CreaAnamnesiRemotaPage
