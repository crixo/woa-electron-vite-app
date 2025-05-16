import { createContext, useState } from "react";

export const ConsultoContext = createContext();

export const ConsultoProvider = ({ children }) => {
    const [entity, setEntity] = useState(null);

    // const fetchPaziente = async (pazienteId) => {
    //     let pRawResponse = await dal.getPaziente(pazienteId);
    //     console.log(pRawResponse); 
    //     const p = JSON.parse(pRawResponse);

    //     let arsRawResponse = await dal.getAnamnesiRemote(pazienteId);
    //     console.log(arsRawResponse); 
    //     const ars = JSON.parse(arsRawResponse);  
    //     p.anamnesiRemote = ars;        

    //     setPaziente(p);
    // };

    const add = async (arData) => {
        console.log(arData);    
        const ar = await dal.addConsulto(arData);
        console.log(ar);        
        setEntity(ar);
        return ar;
    }

    // const updatePaziente = async (pazienteData) => {
    //     console.log(pazienteData);    
    //     const paziente = pazienteData;
    //     console.log(paziente);        
    //     setPaziente(paziente);
    //     return paziente;
    // }    

    return (
        <ConsultoContext.Provider value={{ add }}>
            {children}
        </ConsultoContext.Provider>
    );
};