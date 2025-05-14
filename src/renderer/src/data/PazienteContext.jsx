import { createContext, useState } from "react";

export const PazienteContext = createContext();

export const PazienteProvider = ({ children }) => {
    const [paziente, setPaziente] = useState(null);

    const fetchPaziente = async (pazienteId) => {
        let rawResponse = await dal.getPaziente(pazienteId);
        console.log(rawResponse); 
        const p = JSON.parse(rawResponse);
        setPaziente(p);
    };

    const addPaziente = async (pazienteData) => {
        console.log(pazienteData);    
        const paziente = await dal.addPaziente(pazienteData);
        console.log(paziente);        
        setPaziente(paziente);
        return paziente;
    }

    const updatePaziente = async (pazienteData) => {
        console.log(pazienteData);    
        const paziente = pazienteData;
        console.log(paziente);        
        setPaziente(paziente);
        return paziente;
    }    

    const resetPaziente = () => {
        setPaziente(null);
    };


    return (
        <PazienteContext.Provider value={{ paziente, addPaziente, fetchPaziente, resetPaziente, updatePaziente }}>
            {children}
        </PazienteContext.Provider>
    );
};