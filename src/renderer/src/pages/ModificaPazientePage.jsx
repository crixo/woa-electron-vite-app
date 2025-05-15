import { useContext, useEffect, useState } from "react";
import PazienteForm from "../components/PazienteForm"
import { PazienteContext } from "../data/PazienteContext";
import { toast } from "react-toastify";

const ModificaPazientePage = ({ pazienteId }) => {
  const { paziente, updatePaziente } = useContext(PazienteContext);
  //const paziente = pazienti.find(p => p.id === pazienteId);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // this effect is required to avoid broadcasting patiente changes triggered previously into the Context
    setIsReady(true);
  }, []);// Empty dependency array ensures it runs once at the start  

  useEffect(() => {
    if(isReady && paziente){
        onPazienteChanged();
    }
  }, [paziente]); // Runs when `paziente` changes     

  const onPazienteChanged = () => {
    //if(!isReady) return;
    console.log(paziente);

    toast.success(`save ${paziente.nome} ${paziente.cognome} successuflly`, {
        position: 'top-center'
    })

    // setIsLoading(false);
    // navigate("/paziente/"+paziente.id);
  }  
    
  return paziente ? <PazienteForm paziente={paziente} onSubmit={updatePaziente} /> : <p>Loading...</p>;
};

export default ModificaPazientePage;