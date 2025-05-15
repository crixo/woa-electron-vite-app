import { createContext, useState } from "react";

export const PazienteContext = createContext();

export const PazienteProvider = ({ children }) => {
    const [paziente, setPaziente] = useState(null);

    const fetchPaziente = async (pazienteId) => {
        let pRawResponse = await dal.getPaziente(pazienteId);
        console.log(pRawResponse); 
        const p = JSON.parse(pRawResponse);

        let arsRawResponse = await dal.getAnamnesiRemote(pazienteId);
        console.log(arsRawResponse); 
        const ars = JSON.parse(arsRawResponse);  
        p.anamnesiRemote = ars;        

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