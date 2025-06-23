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


export function validate(mandatoryFields, formData) {
  if(mandatoryFields){
    const data = formData
    for (const [key, rule] of Object.entries(mandatoryFields)) {
      if (rule === 'mandatory') {
        if (!(key in data) || data[key] === null || data[key] === undefined || data[key] === '') {
          return 'Completa i campi obbligatori';
        }
      }
    }
    return '';
  }else{
    //no mandatory fields but user did not valorize any entity property
    const formDataNoIDs = Object.fromEntries(
      Object.entries(formData).filter(([key]) => !key.startsWith("ID"))
    )
    const allEmpty = Object.values(formDataNoIDs).every(value => !value)
    return allEmpty? 'Non è possibile salvare una entità vuota' : ''
  }
}

export function markMandatoryFields(mandatoryFields){
  if(!mandatoryFields) return
  const fields = Object.keys(mandatoryFields)
  const formGroup = document.querySelector('.space-y-2');
  const noteExists = document.querySelector('.campo-obbligatorio-note');

  if (formGroup && !noteExists) {
    const note = document.createElement('div');
    note.className = 'text-right text-sm campo-obbligatorio-note'; // Added unique class
    note.textContent = '* campo obbligatorio';
    formGroup.parentNode?.insertBefore(note, formGroup);
  }

  // Append asterisks to matching labels
  fields.forEach((fieldName) => {
    const inputEl = document.querySelector(
      `input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`
    )
    if (inputEl) {
      const labelEl = inputEl.closest('div')?.querySelector('label');
      if (labelEl && !labelEl.textContent.includes('*')) {
        labelEl.textContent += ' *';
      }
    }
  });
}
