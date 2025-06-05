import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../contexts/PazienteContext'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'
import { PazienteCard } from '../components/PazienteCard'
//import { VITE_BACKEND_URL } from "../App";

const CreaAnamnesiRemotaPage = () => {
  const { paziente, tipoAnamnesi } = useContext(PazienteContext)
  const navigate = useNavigate()

  const saveEntity = async (formData) => {
    if (formData.data === '' || formData.tipo === '' || formData.descrizione === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      //setIsLoading(true);
      const enityCreated = await dal.addAnamnesiRemota(formData)
      console.log(enityCreated)
      
      toast.success(`Anamnesi Remota del ${enityCreated.data} saved successuflly`, {
        position: 'top-center'
      })

      //setIsLoading(false);
      navigate('/paziente/' + paziente.ID)
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })

      //setIsLoading(false);
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
