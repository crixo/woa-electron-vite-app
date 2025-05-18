import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import AnamnesiProssimaForm from '../components/AnamnesiProssimaForm'
import { useParams } from 'react-router-dom'

const ModificaAnamnesiProssimaPage = () => {
    const { consulto, updateAnamnesiProssima } = useContext(ConsultoContext)
    const navigate = useNavigate()
    console.log(consulto)

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
        console.log(entityCreated)
        toast.success(`Anamnesi Prossima del ${entityCreated.data} updated successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Crea nuova Anamnesi Prossima</h2>
      <AnamnesiProssimaForm entity={entity} onSubmit={saveEntity} />
      </>
    )
  }
  

export default ModificaAnamnesiProssimaPage