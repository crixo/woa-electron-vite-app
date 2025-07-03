import { ipcMain } from 'electron'
import { withAudit, db } from './index'

function addPaziente (entity) {
  // try {
    const p = entity
    const sql = "INSERT INTO paziente (nome,cognome,professione,indirizzo,citta,telefono,cellulare,prov,cap,email,data_nascita) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const stmt = db.prepare(sql);
    const result = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita);
    const id = result.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    return result.changes > 0
      ? entity
      : { success: false };
  // } catch (error) {
  //   console.log('IPC Error:', error);
  //   throw error; // Sends error back to renderer
  // }
}

ipcMain.handle('paziente-add', withAudit(addPaziente, {entity:'paziente', crud:'I'}))

ipcMain.handle('paziente-search', async (_, searchCriteria, pageSize, pageNumber) => {
  try {
    console.log(`paziente-search:${searchCriteria} pageSize:${pageSize} pageNumber:${pageNumber}`)
    const sql = "SELECT * FROM paziente WHERE cognome LIKE ? LIMIT ? OFFSET ?"
    const res =  db.prepare(sql).all(`%${searchCriteria}%`, pageSize, (pageSize-1) * pageNumber)
    const stringify = JSON.stringify(res)
    return stringify
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

ipcMain.handle('paziente-many-consulti', async (_, topLimit=20) => {
  try {
    const sql = `SELECT p.*, COUNT(c.ID) AS num_consulti 
    FROM paziente p 
    JOIN consulto c ON p.ID = c.ID_paziente 
    GROUP BY p.ID
    ORDER BY num_consulti DESC 
    LIMIT ?`
    const res =  db.prepare(sql).all(topLimit);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

// NOTE
// the underscore (_) is used as a placeholder for the first parameter, 
// which is typically the event object in Electron's IPC (Inter-Process Communication) system.
ipcMain.handle('paziente-last-consulti', async (_, topLimit=20) => {
  try {
    const sql = `SELECT p.*, max(c.data) as last_consulto_at
    FROM paziente p 
    JOIN consulto c ON p.ID = c.ID_paziente 
    GROUP BY p.ID
    ORDER BY c.data DESC 
    LIMIT ?`
    const res =  db.prepare(sql).all(topLimit);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});   

ipcMain.handle('paziente-get', async (_, pazienteId) => {
  try {
    console.log('paziente-get:'+pazienteId);
    const sql = "SELECT * FROM paziente WHERE ID = ?"
    const p =  db.prepare(sql).get(pazienteId); 
    return JSON.stringify(p);
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});       

function updatePaziente(entity){
  const p = entity
  const sql = "UPDATE paziente SET nome=?,cognome=?,professione=?,indirizzo=?,citta=?,telefono=?,cellulare=?,prov=?,cap=?,email=?,data_nascita=? WHERE ID=?";
  const stmt = db.prepare(sql);
  const info = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita,p.ID);
  return p
}
ipcMain.handle('paziente-update', withAudit(updatePaziente,{entity:'paziente', crud:'U'}))