import { useContext, useEffect, useState } from "react";

const PazienteForm = ({ paziente, onSubmit }) => {
    const [formData, setFormData] = useState(paziente || { nome: '', cognome: '', data_nascita: '' });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input 
            type="text" 
            value={formData.nome} 
            onChange={handleChange} 
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" 
            placeholder="enter Nome" />
        <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} 
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" 
            placeholder="enter Cognome" />
        <input type="date" name="data_nascita" value={formData.data_nascita} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    );
  };
  
  export default PazienteForm;