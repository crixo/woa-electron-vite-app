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

  getConsultiByPaziente: (pazienteId) => ipcRenderer.invoke('consulto-all', pazienteId),
  getConsulto: (consultoId) => ipcRenderer.invoke('consulto-get', consultoId),
  updateConsulto: (entity) => ipcRenderer.invoke('consulto-update', entity),
  addConsulto: (entity) => ipcRenderer.invoke('consulto-add', entity),  

  getAnamnesiProssimeByConsulto: (idConsulto) => ipcRenderer.invoke('anamnesi-prossima-all', idConsulto),
  addAnamnesiProssima: (entity) => ipcRenderer.invoke('anamnesi-prossima-add', entity),  
  updateAnamnesiProssima: (entity) => ipcRenderer.invoke('anamnesi-prossima-update', entity),  

  getEsamiByConsulto: (idConsulto) => ipcRenderer.invoke('esame-all', idConsulto),
  addEsame: (entity) => ipcRenderer.invoke('esame-add', entity),  
  updateEsame: (entity) => ipcRenderer.invoke('esame-update', entity),  

  getTrattamentiByConsulto: (idConsulto) => ipcRenderer.invoke('trattamento-all', idConsulto),
  addTrattamento: (entity) => ipcRenderer.invoke('trattamento-add', entity),  
  updateTrattamento: (entity) => ipcRenderer.invoke('trattamento-update', entity),  

  getValutazioniByConsulto: (idConsulto) => ipcRenderer.invoke('valutazione-all', idConsulto),
  addValutazione: (entity) => ipcRenderer.invoke('valutazione-add', entity),  
  updateValutazione: (entity) => ipcRenderer.invoke('valutazione-update', entity),  
})
