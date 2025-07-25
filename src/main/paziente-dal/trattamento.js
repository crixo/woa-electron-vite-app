import { ipcMain } from 'electron'
import { withAudit, db, withTryCatch } from './index'

function addTrattamento(entity){
  const sql = 'INSERT INTO trattamento (ID_paziente,ID_consulto,data,descrizione) VALUES (?,?,?,?)'
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.data, entity.descrizione)
  const id = info.lastInsertRowid
  entity.ID = id
  return entity
}
ipcMain.handle('trattamento-add', withAudit(addTrattamento, {entity:'trattamento', crud:'I'}))

function getTrattamenti(idConsulto){
  const sql = 'SELECT * FROM trattamento WHERE ID_consulto = ?'
  const res =  db.prepare(sql).all(idConsulto)
  const stringify = JSON.stringify(res)
  return stringify
}
ipcMain.handle('trattamento-all', withTryCatch(getTrattamenti))

function updateTrattamento(entity){
  const sql = 'UPDATE trattamento SET data=?,descrizione=? WHERE ID=?'
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.data, entity.descrizione, entity.ID)
  return entity
}
ipcMain.handle('trattamento-update', withAudit(updateTrattamento, {entity:'trattamento', crud:'U'}))