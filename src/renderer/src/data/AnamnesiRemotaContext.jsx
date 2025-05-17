import { createContext, useState } from 'react'

export const AnamnesiRemotaContext = createContext()

export const AnamnesiRemotaProvider = ({ children }) => {
  // const [anamnesiRemote, setAnamnesiRemote] = useState(null)

  // const getAnamnesiRemoteByPaziente = async (pazienteId) => {
  //     const entitiesSerialized = await dal.getAnamnesiRemoteByPaziente(pazienteId);
  //     const entities = JSON.parse(entitiesSerialized)
  //     setAnamnesiRemote(entities);
  // };

  const add = async (arData) => {
    console.log(arData)
    const ar = await dal.addAnamnesiRemota(arData)
    console.log(ar)
    //setEntity(ar)
    return ar
  }

  const update = async (arData) => {
      console.log(arData);
      await dal.updateAnamnesiRemota(arData)
      //setEntity(arData);
  }

  const reset = () => {
    setEntity(null)
  }

  return <AnamnesiRemotaContext.Provider value={{ add, update }}>{children}</AnamnesiRemotaContext.Provider>
}
