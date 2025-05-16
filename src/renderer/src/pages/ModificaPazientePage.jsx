import { useContext, useEffect, useState } from "react";
import PazienteForm from "../components/PazienteForm"
import { PazienteContext } from "../data/PazienteContext";
import { toast } from "react-toastify";

const ModificaPazientePage = () => {
  const { paziente, updatePaziente } = useContext(PazienteContext);
  //const paziente = pazienti.find(p => p.id === pazienteId);


  const savePaziente = async (formData) => {
    console.log(formData);
    const pazienteUpdated = await updatePaziente(formData);

    toast.success(`save ${pazienteUpdated.nome} ${pazienteUpdated.cognome} successuflly`, {
        position: 'top-center'
    })

    // setIsLoading(false);
    // navigate("/paziente/"+paziente.id);
  }  
    
  return paziente ? <PazienteForm paziente={paziente} onSubmit={savePaziente} /> : <p>Loading...</p>;
};

export default ModificaPazientePage;