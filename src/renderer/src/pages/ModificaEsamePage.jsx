import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import EsameForm from '../components/EsameForm'
import { useParams } from 'react-router-dom'

const ModificaEsamePage = () => {
    const { consulto, updateEsame } = useContext(ConsultoContext)
    const navigate = useNavigate()
    console.log(consulto)

    const { id } = useParams() // Extracts the ID from URL
    const eToUpd = consulto.esami.find(e=>e.ID==id)
    const [entity, setEntity] = useState(eToUpd)    
  
    const saveEsame = async (formData) => {
      if (formData.data === '' || formData.tipo === '' || formData.descrizione === '') {
        toast.warn('please fill all input completely', {
          position: 'top-right'
        })
        return
      }
      try {
        //setIsLoading(true);
        await updateEsame(formData)
        toast.success(`Esame del ${formData.data} updated successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Modifica esame</h2>
      <EsameForm esame={entity} onSubmit={saveEsame} />
      </>
    )
  }

export default ModificaEsamePage