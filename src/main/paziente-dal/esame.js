import { ipcMain } from 'electron'
import { withAudit, db } from './index'

ipcMain.handle('esame-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM esame WHERE ID_consulto = ?"
    const res =  db.prepare(sql).all(idConsulto)
    return JSON.stringify(res)
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});    

function addEsame(entity){
  const sql = "INSERT INTO esame (ID_paziente,ID_consulto,data,tipo,descrizione) VALUES (?,?,?,?,?)";
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.data, entity.tipo, entity.descrizione)
  const id = info.lastInsertRowid
  entity.ID = id
  return entity
}
ipcMain.handle('esame-add', withAudit(addEsame, {entity:'esame', crud:'I'}))

function updateEsame(entity){
  const sql = "UPDATE esame SET data=?,tipo=?,descrizione=? WHERE ID=?";
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.data, entity.tipo, entity.descrizione, entity.ID)
  return entity
}
ipcMain.handle('esame-update', withAudit(updateEsame, {entity:'esame', crud:'U'}))

ipcMain.handle('tipo-esami', async (_) => {
  try {
    const sql = "SELECT * FROM lkp_esame"
    const res =  db.prepare(sql).all()
    return JSON.stringify(res)
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});  