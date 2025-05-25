import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import PazienteConsultoCards from '../components/PazienteConsultoCards'
import { PazienteContext } from '../data/PazienteContext'
import TrattamentoForm from '../components/TrattamentoForm'

const CreaTrattamentoPage = () => {
    const { consulto, addTrattamento } = useContext(ConsultoContext)
    const{ paziente } = useContext(PazienteContext)
    const navigate = useNavigate()
    console.log(consulto)
  
    const saveEsame = async (formData) => {
      if (formData.data === '' || formData.tipo === '' || formData.descrizione === '') {
        toast.warn('please fill all input completely', {
          position: 'top-right'
        })
        return
      }
      try {
        //setIsLoading(true);
        const entityCreated = await addTrattamento(formData)
        console.log(entityCreated)
        toast.success(`Trattamento del ${entityCreated.data} saved successuflly`, {
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
      <h3 className="h3-primary">Crea nuovo Trattamento</h3>
      <TrattamentoForm entity={{ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID, data:'', descrizione:'' }} onSubmit={saveEsame} />
      </>
    )
  }
  

export default CreaTrattamentoPage