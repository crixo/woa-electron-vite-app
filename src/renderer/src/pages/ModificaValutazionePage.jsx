import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import { useParams } from 'react-router-dom'
import ValutazioneForm from '../components/ValutazioneForm'

const ModificaValutazionePage = () => {
    const { consulto, updateValutazione } = useContext(ConsultoContext)
    const navigate = useNavigate()
    console.log(consulto)

    const { id } = useParams() // Extracts the ID from URL
    const entityToUpd = consulto.valutazioni.find(e=>e.ID==id)
    const [entity, setEntity] = useState(entityToUpd)    
  
    const saveEntity = async (formData) => {
      // if (formData.strutturale === '' || formData.cranio_sacrale === '') {
      //   toast.warn('please fill all input completely', {
      //     position: 'top-right'
      //   })
      //   return
      // }
      try {
        //setIsLoading(true);
        await updateValutazione(formData)
        toast.success(`Valutazione updated successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Modifica Trattamento</h2>
      <ValutazioneForm entity={entity} onSubmit={saveEntity} />
      </>
    )
  }

export default ModificaValutazionePage