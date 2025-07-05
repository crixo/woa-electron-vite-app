import { ipcMain } from 'electron'
import { withAudit, withTryCatch, db } from './index'

function addPaziente (entity) {
    const p = entity
    const sql = "INSERT INTO paziente (nome,cognome,professione,indirizzo,citta,telefono,cellulare,prov,cap,email,data_nascita) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const stmt = db.prepare(sql);
    const result = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita);
    const id = result.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    return result.changes > 0
      ? entity
      : { success: false }
}
// NOTE
// the underscore (_) is used as a placeholder for the first parameter, 
// which is typically the event object in Electron's IPC (Inter-Process Communication) system.
ipcMain.handle('paziente-add', withAudit(addPaziente, {entity:'paziente', crud:'I'}))

function searchPaziente(searchCriteria, pageSize, pageNumber){
  //console.log('args', args)
  //const [searchCriteria, pageSize, pageNumber] = args
  console.log(`paziente-search:${searchCriteria} pageSize:${pageSize} pageNumber:${pageNumber}`)
  const sql = "SELECT * FROM paziente WHERE cognome LIKE ? LIMIT ? OFFSET ?"
  const res =  db.prepare(sql).all(`%${searchCriteria}%`, pageSize, (pageSize-1) * pageNumber)
  const stringify = JSON.stringify(res)
  return stringify
} 
ipcMain.handle('paziente-search', withTryCatch(searchPaziente))

function getPazientiWithManyConsulti(topLimit=20) {
  console.log(`topLimit:${topLimit}`)
  const sql = `SELECT p.*, COUNT(c.ID) AS num_consulti 
  FROM paziente p 
  JOIN consulto c ON p.ID = c.ID_paziente 
  GROUP BY p.ID
  ORDER BY num_consulti DESC 
  LIMIT ?`
  const res =  db.prepare(sql).all(topLimit)
  const stringify = JSON.stringify(res)
  return stringify
}   
ipcMain.handle('paziente-many-consulti', withTryCatch(getPazientiWithManyConsulti))


function getRecentlyVisitedPazienti(topLimit=20) {
    const sql = `SELECT p.*, max(c.data) as last_consulto_at
    FROM paziente p 
    JOIN consulto c ON p.ID = c.ID_paziente 
    GROUP BY p.ID
    ORDER BY c.data DESC 
    LIMIT ?`
    const res =  db.prepare(sql).all(topLimit)
    const stringify = JSON.stringify(res)
    return stringify
} 
ipcMain.handle('paziente-last-consulti', withTryCatch(getRecentlyVisitedPazienti))

function getPaziente(pazienteId) {
    console.log('paziente-get:'+pazienteId);
    const sql = 'SELECT * FROM paziente WHERE ID = ?'
    const p =  db.prepare(sql).get(pazienteId)
    return JSON.stringify(p)
}
ipcMain.handle('paziente-get', withTryCatch(getPaziente))

function updatePaziente(entity){
  const p = entity
  const sql = "UPDATE paziente SET nome=?,cognome=?,professione=?,indirizzo=?,citta=?,telefono=?,cellulare=?,prov=?,cap=?,email=?,data_nascita=? WHERE ID=?";
  const stmt = db.prepare(sql);
  const info = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita,p.ID);
  return p
}
ipcMain.handle('paziente-update', withAudit(updatePaziente,{entity:'paziente', crud:'U'}))