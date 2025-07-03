import { createContext, useEffect, useState } from 'react'

export const ConsultoContext = createContext()

export const ConsultoProvider = ({ children }) => {
  const [consulto, setConsulto] = useState(null)
  const [tipoEsami, setTipoEsami] = useState(null)

  const fetchConsulto = async (idConsulto) => {
      console.log('fetching consulto for ID: '+idConsulto)
      const cRawResponse = await dal.getConsulto(idConsulto);
      const c = JSON.parse(cRawResponse);

      const apsRawResponse = await dal.getAnamnesiProssimeByConsulto(idConsulto);
      const aps = JSON.parse(apsRawResponse);
      const apsWithId = aps.map(obj => ({
        ID: `${obj.ID_paziente}-${obj.ID_consulto}`,
        ...obj
      }));
      c.anamnesiProssime = apsWithId;

      const eRawResponse = await dal.getEsamiByConsulto(idConsulto);
      const es = JSON.parse(eRawResponse);
      c.esami = es;

      const tRawResponse = await dal.getTrattamentiByConsulto(idConsulto);
      const ts = JSON.parse(tRawResponse);
      c.trattamenti = ts;      

      const vRawResponse = await dal.getValutazioniByConsulto(idConsulto);
      const vs = JSON.parse(vRawResponse);
      c.valutazioni = vs

      console.log(c)
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

  const deleteConsulto = async (consulto) => {
    console.log(consulto)
    await dal.deleteConsulto(consulto)
    setConsulto(null);
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

  const deleteAnamnesiProssima = async (entity) => {
    await dal.deleteAnamnesiProssima(entity.ID_paziente, entity.ID_consulto)
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
  }  

  const deleteEsame = async (entity) => {
    await dal.deleteLeaf('esame', entity.ID);
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

  const deleteTrattamento = async (entity) => {
    await dal.deleteLeaf('trattamento', entity.ID);
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

  const deleteValutazione = async (entity) => {
      await dal.deleteLeaf('valutazione', entity.ID)
  }

  return <ConsultoContext.Provider value={{ consulto, fetchConsulto, add, update, deleteConsulto,
      addEsame, updateEsame, getTipoEsami, tipoEsami, deleteEsame,
      addTrattamento, updateTrattamento, deleteTrattamento,
      addAnamnesiProssima, updateAnamnesiProssima, deleteAnamnesiProssima,
      addValutazione, updateValutazione, deleteValutazione
    }}>{children}</ConsultoContext.Provider>
}
