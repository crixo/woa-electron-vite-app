import { useContext, useEffect, useState } from "react";
import PazienteForm from "../components/PazienteForm"
import { PazienteContext } from "../data/PazienteContext";

const ModificaPazientePage = ({ pazienteId }) => {
    const { paziente, updatePaziente } = useContext(PazienteContext);
    //const paziente = pazienti.find(p => p.id === pazienteId);
    
    return paziente ? <PazienteForm paziente={paziente} onSubmit={updatePaziente} /> : <p>Loading...</p>;
  };

  export default ModificaPazientePage;