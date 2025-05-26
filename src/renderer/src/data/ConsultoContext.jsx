import { createContext, useEffect, useState } from 'react'

export const ConsultoContext = createContext()

export const ConsultoProvider = ({ children }) => {
  const [consulto, setConsulto] = useState(null)
  const [tipoEsami, setTipoEsami] = useState(null)

  const fetchConsulto = async (idConsulto) => {
      console.log('fetching consulto for ID: '+idConsulto)
      const cRawResponse = await dal.getConsulto(idConsulto);
      console.log(cRawResponse);
      const c = JSON.parse(cRawResponse);

      const apsRawResponse = await dal.getAnamnesiProssimeByConsulto(idConsulto);
      console.log(apsRawResponse);
      const aps = JSON.parse(apsRawResponse);
      const apsWithId = aps.map(obj => ({
        ID: `${obj.ID_paziente}-${obj.ID_consulto}`,
        ...obj
      }));
      c.anamnesiProssime = apsWithId;

      const eRawResponse = await dal.getEsamiByConsulto(idConsulto);
      console.log(eRawResponse);
      const es = JSON.parse(eRawResponse);
      c.esami = es;

      const tRawResponse = await dal.getTrattamentiByConsulto(idConsulto);
      console.log(tRawResponse);
      const ts = JSON.parse(tRawResponse);
      c.trattamenti = ts;      

      const vRawResponse = await dal.getValutazioniByConsulto(idConsulto);
      console.log(vRawResponse);
      const vs = JSON.parse(vRawResponse);
      c.valutazioni = vs

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

  const addAnamnesiProssima = async (entityData) => {
    // console.log(consulto.ID)
    // console.log(esameData)
    const entity = await dal.addAnamnesiProssima(entityData)
    //await fetchConsulto(consulto.ID)
    return entity
  }

  const updateAnamnesiProssima  = async (entity) => {
      const res = await dal.updateAnamnesiProssima(entity);
      // console.log('dal.updateConsulto -> ' + res)
      // if(!res) throw new Error("updateConsulto failed");
      
      //setConsulto(esame);
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
      
      //setConsulto(esame);
  }  

  

  const getTipoEsami = async () => {
      const entitiesSerialized = await dal.getTipologiaEsame();
      const entities = JSON.parse(entitiesSerialized)
      setTipoEsami(entities);
  };  

  const addTrattamento = async (entityData) => {
    // console.log(consulto.ID)
    // console.log(esameData)
    const entity = await dal.addTrattamento(entityData)
    //await fetchConsulto(consulto.ID)
    return entity
  }

  const updateTrattamento = async (entity) => {
      const res = await dal.updateTrattamento(entity);
      // console.log('dal.updateConsulto -> ' + res)
      // if(!res) throw new Error("updateConsulto failed");
      
      //setConsulto(esame);
  }  
  const addValutazione = async (entityData) => {
    // console.log(consulto.ID)
    // console.log(esameData)
    const entity = await dal.addValutazione(entityData)
    //await fetchConsulto(consulto.ID)
    return entity
  }

  const updateValutazione = async (entity) => {
      const res = await dal.updateValutazione(entity);
  }  

  return <ConsultoContext.Provider value={{ consulto, fetchConsulto, add, update, 
      addEsame, updateEsame, getTipoEsami, tipoEsami,
      addTrattamento, updateTrattamento, 
      addAnamnesiProssima, updateAnamnesiProssima,
      addValutazione, updateValutazione
    }}>{children}</ConsultoContext.Provider>
}
