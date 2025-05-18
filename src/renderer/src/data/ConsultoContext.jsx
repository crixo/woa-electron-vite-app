import { createContext, useEffect, useState } from 'react'

export const ConsultoContext = createContext()

export const ConsultoProvider = ({ children }) => {
  const [consulto, setConsulto] = useState(null)

  const fetchConsulto = async (idConsulto) => {
      console.log('fetching consulto for ID: '+idConsulto)
      const cRawResponse = await dal.getConsulto(idConsulto);
      console.log(cRawResponse);
      const c = JSON.parse(cRawResponse);

      const apsRawResponse = await dal.getAnamnesiProssimeByConsulto(idConsulto);
      console.log(apsRawResponse);
      const aps = JSON.parse(apsRawResponse);
      c.anamnesiProssime = aps;

      const eRawResponse = await dal.getEsamiByConsulto(idConsulto);
      console.log(eRawResponse);
      const es = JSON.parse(eRawResponse);
      c.esami = es;

      setConsulto(c);
  };

  const add = async (consultoData) => {
    const consulto = await dal.addConsulto(consultoData)
    setConsulto(consulto)
    return consulto
  }

  const update = async (consulto) => {
      const res = await dal.updateConsulto(consulto);
      // console.log('dal.updateConsulto -> ' + res)
      // if(!res) throw new Error("updateConsulto failed");
      
      setConsulto(consulto);
  }

  const addEsame = async (esameData) => {
    // console.log(consulto.ID)
    // console.log(esameData)
    const esame = await dal.addEsame(esameData)
    //await fetchConsulto(consulto.ID)
    return esame
  }

  const updateEsame = async (esame) => {
      const res = await dal.updateEsame(esame);
      // console.log('dal.updateConsulto -> ' + res)
      // if(!res) throw new Error("updateConsulto failed");
      
      setConsulto(esame);
  }  

  return <ConsultoContext.Provider value={{ consulto, fetchConsulto, add, update, addEsame }}>{children}</ConsultoContext.Provider>
}
