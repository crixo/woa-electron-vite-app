import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PazienteContext } from '../data/PazienteContext'
import PazienteForm from '../components/PazienteForm'
//import { VITE_BACKEND_URL } from "../App";

const CreaPazientePage = () => {
  const { addPaziente } = useContext(PazienteContext)
  const navigate = useNavigate()

  const savePaziente = async (formData) => {
    if (formData.nome === '' || formData.cognome === '' || formData.data_nascita === '') {
      toast.warn('please fill all input completely', {
        position: 'top-right'
      })
      return
    }
    try {
      //setIsLoading(true);
      let pazienteCreated = await addPaziente(formData)
      console.log(pazienteCreated)
      toast.success(`save ${pazienteCreated.nome} ${pazienteCreated.cognome} successuflly`, {
        position: 'top-center'
      })

      //setIsLoading(false);
      navigate('/paziente/' + pazienteCreated.ID)
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })

      //setIsLoading(false);
    }
  }

  return (
    <>
    <h3 class="h3-primary">Crea nuovo paziente</h3>
    <PazienteForm paziente={{ data_nascita:''}} onSubmit={savePaziente} />
    </>
  )
}

export default CreaPazientePage
