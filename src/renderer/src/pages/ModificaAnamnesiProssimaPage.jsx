import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
import AnamnesiProssimaForm from '../components/AnamnesiProssimaForm'
import PazienteConsultoCards from '../components/PazienteConsultoCards'
import { useParams } from 'react-router-dom'

const ModificaAnamnesiProssimaPage = () => {
    const { consulto, updateAnamnesiProssima } = useContext(ConsultoContext)
    const {paziente} = useContext(PazienteContext)
    const navigate = useNavigate()

    const { id } = useParams() // Extracts the ID from URL
    const entityToUpd = consulto.anamnesiProssime.find(e=>e.ID==id)
    const [entity, setEntity] = useState(entityToUpd)        
  
    const saveEntity = async (formData) => {
      // if (formData.data === '' || formData.tipo === '' || formData.descrizione === '') {
      //   toast.warn('please fill all input completely', {
      //     position: 'top-right'
      //   })
      //   return
      // }
      try {
        //setIsLoading(true);
        const entityCreated = await updateAnamnesiProssima(formData)
        toast.success(`Anamnesi Prossima updated successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Modifca Anamnesi Prossima</h2>
      <AnamnesiProssimaForm entity={entity} onSubmit={saveEntity} />
      </>
    )
  }
  

export default ModificaAnamnesiProssimaPage