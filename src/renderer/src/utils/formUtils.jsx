import { formatDate } from "./dateUtils"
import { toast } from 'react-toastify'
  
export const handleFormChange = (e, formData, setFormData) => {
  const name = e.target.name
  let value = e.target.value
  if(e.target.name.startsWith('data')){
      value = formatDate(value, 'yyyy-MM-dd HH:mm:ss' )
  }
  setFormData({ ...formData, [name]: value })
}

export const persistEntity = async (formData, missingMandatoryField, persist, successMessage='Entità salvata con succeso') => {

  console.log('missingMandatoryField(formData)'+missingMandatoryField(formData), formData)
  if (missingMandatoryField(formData)) {
    toast.warn('please fill all input completely', {
      position: 'top-right'
    })
    return
  }
  try {
    //setIsLoading(true);
    const enityPersisted = await persist(formData)      
    toast.success(successMessage, {
      position: 'top-center'
    })

    //setIsLoading(false);
    return true
  } catch (error) {
    toast.error(error.message, {
      position: 'top-center'
    })

    //setIsLoading(false);
    return false
  }  
}

export const submitIfFormDataAreValid = (formData, submit, verify) => {
  if(verify(formData)){
    toast.warn('please fill all input completely', {
      position: 'top-right'
    })
  }else{
    submit(formData)
  }
}