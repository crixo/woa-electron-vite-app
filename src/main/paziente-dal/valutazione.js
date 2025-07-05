import { ipcMain } from 'electron'
import { withAudit, db, withTryCatch } from './index'

function addValutazione(entity){
  const sql = 'INSERT INTO valutazione (ID_paziente,ID_consulto,strutturale,cranio_sacrale,ak_ortodontica) VALUES (?,?,?,?,?)'
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.strutturale, entity.cranio_sacrale, entity.ak_ortodontica)
  const id = info.lastInsertRowid
  entity.ID = id
  return entity;
}
ipcMain.handle('valutazione-add', withAudit(addValutazione, {entity:'valutazione', crud:'I'}))

function getValutazioni(idConsulto){
  const sql = 'SELECT * FROM valutazione WHERE ID_consulto = ?'
  const res =  db.prepare(sql).all(idConsulto)
  return JSON.stringify(res)
}
ipcMain.handle('valutazione-all', withTryCatch(getValutazioni))

function updateValutazione(entity){
  const sql = 'UPDATE valutazione SET strutturale=?,cranio_sacrale=?,ak_ortodontica=? WHERE ID=?'
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.strutturale, entity.cranio_sacrale, entity.ak_ortodontica, entity.ID)
  return entity
}
ipcMain.handle('valutazione-update', withAudit(updateValutazione, {entity:'valutazione', crud:'U'}))