import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import ValutazioneForm from '../components/ValutazioneForm'

const CreaValutazionePage = () => {
    const { consulto, addValutazione } = useContext(ConsultoContext)
    const navigate = useNavigate()
    console.log(consulto)
  
    const saveEntity = async (formData) => {
      // if (formData.strutturale === '' || formData.cranio_sacrale === '' || formData.ak_ortodontica === '') {
      //   toast.warn('please fill all input completely', {
      //     position: 'top-right'
      //   })
      //   return
      // }
      try {
        //setIsLoading(true);
        const entityCreated = await addValutazione(formData)
        console.log(entityCreated)
        toast.success(`Valutazione saved successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Crea nuovo Trattamento</h2>
      <ValutazioneForm entity={{ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID}} onSubmit={saveEntity} />
      </>
    )
  }
  

export default CreaValutazionePage