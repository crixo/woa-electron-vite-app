import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PazienteContext } from "../data/PazienteContext";
import PazienteForm from "../components/PazienteForm"
//import { VITE_BACKEND_URL } from "../App";

const CreaPazientePage = () => {
    const { addPaziente } = useContext(PazienteContext);
    const navigate = useNavigate();

    const savePaziente= async (formData) => {

        if(formData.nome === "" || formData.cognome === "" || formData.dataDiNascita === "") {
            
            toast.warn('please fill all input completely', {
                position: 'top-right'
            });
            return;
        }
        try{
            //setIsLoading(true);
            let pazienteCreated = await addPaziente(formData);
            console.log(pazienteCreated);
            toast.success(`save ${pazienteCreated.nome} ${pazienteCreated.cognome} successuflly`, {
                position: 'top-center'
            })
    
            //setIsLoading(false);
            navigate("/paziente/"+pazienteCreated.id);            
        }catch (error){
            toast.error(error.message, {
                position: 'top-center'
            });

            //setIsLoading(false);
        }
    }


 
    return <PazienteForm paziente={{ nome: '', cognome: '', data_nascita: '' }} onSubmit={savePaziente} /> 
}

export default CreaPazientePage;