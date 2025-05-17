import { createContext, useState } from 'react'

export const ConsultoContext = createContext()

export const ConsultoProvider = ({ children }) => {
  const [entity, setEntity] = useState(null)

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

  const add = async (consultoData) => {
    const consulto = await dal.addConsulto(consultoData)
    setEntity(consulto)
    return consulto
  }

  const update = async (consulto) => {
      const res = await dal.updateConsulto(consulto);
      // console.log('dal.updateConsulto -> ' + res)
      // if(!res) throw new Error("updateConsulto failed");
      
      setEntity(consulto);
  }

  return <ConsultoContext.Provider value={{ add, update }}>{children}</ConsultoContext.Provider>
}
