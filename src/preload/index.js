//import { contextBridge } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// // Custom APIs for renderer
// const api = {}

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }

const { contextBridge, ipcRenderer  } = require('electron')
console.log('preload.js');

contextBridge.exposeInMainWorld('dal', {
  getPazienti: (searchCriteria) => ipcRenderer.invoke('paziente-search', searchCriteria),
  addPaziente: (paziente) => ipcRenderer.invoke('paziente-add', paziente),
  getPaziente: (pazienteId) => ipcRenderer.invoke('paziente-get', pazienteId),
  updatePaziente: (paziente) => ipcRenderer.invoke('paziente-update', paziente),

  updateAnamnesiRemote: (entity) => ipcRenderer.invoke('anamnesiremota-update', entity),
  addAnamnesiRemota: (entity) => ipcRenderer.invoke('anamnesiremota-add', entity),
  updateAnamnesiRemota: (entity) => ipcRenderer.invoke('anamnesiremota-update', entity),
  getAnamnesiRemoteByPaziente: (pazienteId) => ipcRenderer.invoke('anamnesiremota-all', pazienteId),

  getConsultiByPaziente: (pazienteId) => ipcRenderer.invoke('consulti-all', pazienteId),
  getConsulto: (consultoId) => ipcRenderer.invoke('consulto-get', consultoId),
  updateConsulto: (entity) => ipcRenderer.invoke('consulto-update', entity),
  addConsulto: (entity) => ipcRenderer.invoke('consulto-add', entity),  

  getAnamnesiProssimeByConsulto: (idConsulto) => ipcRenderer.invoke('anamnesi-prossime-all', idConsulto),

  getEsamiByConsulto: (idConsulto) => ipcRenderer.invoke('esami-all', idConsulto),
  addEsame: (entity) => ipcRenderer.invoke('esame-add', entity),  
})
