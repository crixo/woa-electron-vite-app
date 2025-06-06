import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../contexts/ConsultoContext'
import PazienteConsultoCards from '../components/PazienteConsultoCards'
import { PazienteContext } from '../contexts/PazienteContext'
import TrattamentoForm from '../components/TrattamentoForm'
import { useParams } from 'react-router-dom'

const ModificaTrattamentoPage = () => {
    const { consulto, updateTrattamento } = useContext(ConsultoContext)
    const{ paziente } = useContext(PazienteContext)
    const navigate = useNavigate()
    console.log(consulto)

    const { id } = useParams() // Extracts the ID from URL
    const entityToUpd = consulto.trattamenti.find(e=>e.ID==id)
    const [entity, setEntity] = useState(entityToUpd)    
  
    const saveTrattamento = async (formData) => {
      if (formData.data === '' || formData.descrizione === '') {
        toast.warn('please fill all input completely', {
          position: 'top-right'
        })
        return
      }
      try {
        //setIsLoading(true);
        await updateTrattamento(formData)
        toast.success(`Trattamento del ${formData.data} updated successuflly`, {
          position: 'top-center'
        })
  
        //setIsLoading(false);
        navigate('/consulto/' + consulto.ID)
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center'
        })
  
        //setIsLoading(false);
      }
    }
  
    return (
      <>
      <PazienteConsultoCards paziente={paziente} consulto={consulto} />
      <h3 className="h3-primary">Modifica Trattamento</h3>
      <TrattamentoForm entity={entity} onSubmit={saveTrattamento} />
      </>
    )
  }

export default ModificaTrattamentoPage