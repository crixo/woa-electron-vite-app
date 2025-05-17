import { createContext, useState } from 'react'

export const PazienteContext = createContext()

export const PazienteProvider = ({ children }) => {
  const [paziente, setPaziente] = useState(null)
//   const [paziente, setPaziente] = useState(() => {
//     // Retrieve from localStorage on initial load
//     const storedPaziente = localStorage.getItem("paziente");
//     return storedPaziente ? JSON.parse(storedPaziente) : null;
// });

// useEffect(() => {
//     async function fetchPaziente() {
//         const response = await fetch("/api/paziente");
//         const data = await response.json();
//         setPaziente(data);
//         localStorage.setItem("paziente", JSON.stringify(data)); // Persist update
//     }

//     if (!paziente) {
//         fetchPaziente();
//     }
// }, []);   

  const fetchPaziente = async (pazienteId) => {
    const pRawResponse = await dal.getPaziente(pazienteId)
    const p = JSON.parse(pRawResponse)

    const arsRawResponse= await dal.getAnamnesiRemoteByPaziente(pazienteId)
    const ars = JSON.parse(arsRawResponse)
    p.anamnesiRemote = ars

    const cRawResponse = await dal.getConsultiByPaziente(pazienteId)
    const cs = JSON.parse(cRawResponse)
    p.consulti = cs

    setPaziente(p)
  }

  const addPaziente = async (pazienteData) => {
    const paziente = await dal.addPaziente(pazienteData)
    setPaziente(paziente)
    return paziente
  }

  const updatePaziente = async (pazienteData) => {
    const paziente = await dal.updatePaziente(pazienteData)
    setPaziente(paziente)
    return paziente
  }

  const resetPaziente = () => {
    setPaziente(null)
  }

  return (
    <PazienteContext.Provider
      value={{ paziente, addPaziente, fetchPaziente, resetPaziente, updatePaziente }}
    >
      {children}
    </PazienteContext.Provider>
  )
}
