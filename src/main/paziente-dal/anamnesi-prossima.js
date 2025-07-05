import { ipcMain } from 'electron'
import { withAudit, db, withTryCatch } from './index'

function addAnamnesiProssima(entity){
  const sql = "INSERT INTO anamnesi_prossima (ID_paziente,ID_consulto,prima_volta,tipologia,localizzazione,irradiazione,periodo_insorgenza,durata,familiarita,altre_terapie,varie) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const stmt = db.prepare(sql);
  stmt.run(entity.ID_paziente, entity.ID_consulto, entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie)
  entity.ID = entity.ID_consulto
  return entity
}
ipcMain.handle('anamnesi-prossima-add', withAudit(addAnamnesiProssima, {entity:'anamnesi-prossima', crud:'I'}))

function getAnamnesiProssime(idConsulto) {
    const sql = 'SELECT * FROM anamnesi_prossima WHERE ID_consulto= ?'
    const res =  db.prepare(sql).all(idConsulto)
    return JSON.stringify(res)
}
ipcMain.handle('anamnesi-prossima-all', withTryCatch(getAnamnesiProssime))

function updateAnamnesiProssima(entity){
  const sql = "UPDATE anamnesi_prossima SET prima_volta=?,tipologia=?,localizzazione=?,irradiazione=?,periodo_insorgenza=?,durata=?,familiarita=?,altre_terapie=?,varie=? WHERE ID_paziente=? AND ID_consulto=?";
  const stmt = db.prepare(sql)
  stmt.run(entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie, entity.ID_paziente, entity.ID_consulto)
  return entity
}
ipcMain.handle('anamnesi-prossima-update', withAudit(updateAnamnesiProssima, {entity:'anamnesi-prossima', crud:'U'}))

function deleteAnamnesiProssima(entity){
  console.log(`delete anamnesi_prossima with ID_paziente=${entity.ID_paziente} ID_Consulto=${entity.ID_consulto}`)
  const sql = "DELETE FROM anamnesi_prossima WHERE ID_paziente=? AND ID_consulto=?"
  const stmt = db.prepare(sql)
  const info = stmt.run(entity.ID_paziente, entity.ID_consulto)
  entity.ID=entity.ID_consulto
  return entity
}
ipcMain.handle('anamnesi-prossima-delete', withAudit(deleteAnamnesiProssima, {entity:'anamnesi-prossima', crud:'D'}))  