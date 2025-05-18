import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ConsultoContext } from '../data/ConsultoContext'
import EsameForm from '../components/EsameForm'

const CreaEsamePage = () => {
    const { consulto, addEsame } = useContext(ConsultoContext)
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
        const esameCreated = await addEsame(formData)
        console.log(esameCreated)
        toast.success(`Esame del ${esameCreated.data} saved successuflly`, {
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
      <h2 className="ext-xl font-semibold text-blue-700 mb-2">Crea nuovo esame</h2>
      <EsameForm esame={{ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID }} onSubmit={saveEsame} />
      </>
    )
  }
  

export default CreaEsamePage