import { useState } from "react";

const PazienteForm = ({ paziente, onSubmit }) => {
    const [formData, setFormData] = useState(paziente);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatDate = (dateString) => {
      if(dateString===undefined) return null;
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Extracts yyyy-MM-dd
    };
  
  
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <div className="space-y-2">
          <label>Nome</label>
          <input 
              type="text" 
              value={formData.nome} 
              name="nome"
              onChange={handleChange} 
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" 
              placeholder="enter Nome" />
        </div>
        <div className="space-y-2">
            <label>Cognome</label>
          <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} 
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" 
              placeholder="enter Cognome" />
        </div>
        <div className="space-y-2">
            <label>Data di Nascita</label>
            <input 
                type="date" 
                name="data_nascita"
                value={formatDate(formData.data_nascita)} 
                onChange={handleChange} 
                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" 
                placeholder="enter Data di Nascita"/>
        </div>
        <button type="submit">Save</button>
      </form>
    );
  };
  
  export default PazienteForm;