import { ipcMain } from 'electron'
import { withAudit, db } from './index'

ipcMain.handle('anamnesi-prossima-add', async (_, entity) => {
  try {
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Esame');
    const sql = "INSERT INTO anamnesi_prossima (ID_paziente,ID_consulto,prima_volta,tipologia,localizzazione,irradiazione,periodo_insorgenza,durata,familiarita,altre_terapie,varie) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const stmt = db.prepare(sql);
    stmt.run(entity.ID_paziente, entity.ID_consulto, entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie)
    return entity
  } catch (error) {
    console.log('IPC Error:', error)
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('anamnesi-prossima-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM anamnesi_prossima WHERE ID_consulto= ?"
    const res =  db.prepare(sql).all(idConsulto)
    return JSON.stringify(res)
  } catch (error) {
    console.log('IPC Error:', error)
    throw error; // Sends error back to renderer
  }
});  

ipcMain.handle('anamnesi-prossima-update', async (_, entity) => {
  try {
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Esame');
    const sql = "UPDATE anamnesi_prossima SET prima_volta=?,tipologia=?,localizzazione=?,irradiazione=?,periodo_insorgenza=?,durata=?,familiarita=?,altre_terapie=?,varie=? WHERE ID_paziente=? AND ID_consulto=?";
    const stmt = db.prepare(sql)
    stmt.run(entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie, entity.ID_paziente, entity.ID_consulto)
    return entity
  } catch (error) {
    console.log('IPC Error:', error)
    throw error; // Sends error back to renderer
  }
});   

ipcMain.handle('anamnesi-prossima-delete', async (_, ID_paziente, ID_consulto) => {
  try {
    console.log(`delete anamnesi_prossima with ID_paziente=${ID_paziente} ID_Consulto=${ID_consulto}`)
    const sql = "DELETE FROM anamnesi_prossima WHERE ID_paziente=? AND ID_consulto=?"
    const stmt = db.prepare(sql)
    const info = stmt.run(ID_paziente, ID_consulto)
    return true;
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});     