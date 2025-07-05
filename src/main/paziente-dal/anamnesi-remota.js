import { ipcMain } from 'electron'
import { withAudit, withTryCatch, db } from './index'

function addAnamnesiRemota(entity){
  const sql = "INSERT INTO anamnesi_remota (id_paziente,data,tipo,descrizione) VALUES (?,?,?,?)";
  const stmt = db.prepare(sql);
  const info = stmt.run(entity.ID_paziente, entity.data, entity.tipo, entity.descrizione);
  const id = info.lastInsertRowid;
  console.log(`id:${id}`);
  entity.ID = id;
  return entity;
} 
ipcMain.handle('anamnesiremota-add', withAudit(addAnamnesiRemota, {entity:'anamnesi-remota', crud:'I'}))

function getAnamnesiRemote(pazienteId) {
  console.log('anamnesiremote-all:'+pazienteId)
  const sql = 'SELECT * FROM anamnesi_remota WHERE ID_paziente = ?'
  const res =  db.prepare(sql).all(pazienteId)
  const stringify = JSON.stringify(res)
  return stringify
}
ipcMain.handle('anamnesiremota-all', withTryCatch(getAnamnesiRemote))

function updateAnamnesiRemota(entity){
  const sql = "UPDATE anamnesi_remota SET data=?,tipo=?,descrizione=? WHERE ID = ?"
  db.prepare(sql).run(entity.data, entity.tipo, entity.descrizione, entity.ID)
  return entity
}
ipcMain.handle('anamnesiremota-update', withAudit(updateAnamnesiRemota, {entity:'anamnesi-remota', crud:'U'}))

ipcMain.handle('consulto-all', async (_, pazienteId) => {
  try {
    console.log('consulti-all:'+pazienteId)
    const sql = "SELECT * FROM consulto WHERE ID_paziente = ?"
    const res =  db.prepare(sql).all(pazienteId)
    const stringify = JSON.stringify(res)
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
})

function getTipiAnamnesiRemota() {
  const sql = "SELECT * FROM lkp_anamnesi"
  const res =  db.prepare(sql).all()
  return JSON.stringify(res)
}
ipcMain.handle('tipo-anamnesi-remota', withTryCatch(getTipiAnamnesiRemota))