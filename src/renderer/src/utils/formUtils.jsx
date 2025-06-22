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

export const submitIfFormDataAreValid = (formData, submit, verify) => {
  if(!verify(formData)){
    toast.warn('please fill all input completely', {
      position: 'top-right'
    })
  }else{
    submit(formData)
  }
}


export function validate(entityType, formData, settings) {
  const data = formData
  console.log(entityType, settings.validations, settings.validations[entityType])
  const mandatoryRules = settings.validations[entityType]
  console.log(mandatoryRules)
  for (const [key, rule] of Object.entries(mandatoryRules)) {
    if (rule === 'mandatory') {
      if (!(key in data) || data[key] === null || data[key] === undefined || data[key] === '') {
        return false;
      }
    }
  }
  return true;
}
