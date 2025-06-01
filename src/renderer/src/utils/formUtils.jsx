  import { formatDate } from "./dateUtils"
  
  export const handleFormChange = (e, formData, setFormData) => {
    const name = e.target.name
    let value = e.target.value
    if(e.target.name.startsWith('data')){
        value = formatDate(value, 'yyyy-MM-dd HH:mm:ss' )
    }
    setFormData({ ...formData, [name]: value })
  }