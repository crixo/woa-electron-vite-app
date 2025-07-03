import { ipcMain } from 'electron'
import { withAudit, db } from './index'

function addConsulto(entity){
  const sql = "INSERT INTO consulto (ID_paziente,data,problema_iniziale) VALUES (?,?,?)";
  const stmt = db.prepare(sql);
  const info = stmt.run(entity.ID_paziente, entity.data, entity.problema_iniziale)
  const id = info.lastInsertRowid
  entity.ID = id
  return entity;
}
ipcMain.handle('consulto-add', withAudit(addConsulto, {entity:'consulto', crud:'I'}))

import { ipcMain } from 'electron'
import { withAudit, db } from './index'

ipcMain.handle('consulto-get', async (_, idConsulto) => {
  try {
    console.log('consulto-get:'+idConsulto);
    const sql = "SELECT * FROM consulto WHERE ID = ?"
    const p =  db.prepare(sql).get(idConsulto);
    return JSON.stringify(p);
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
})

function updateConsulto(entity){
  const sql = "UPDATE consulto SET data=?,problema_iniziale=? WHERE ID = ?"
  db.prepare(sql).run(entity.data, entity.problema_iniziale, entity.ID)
  return entity
}  
ipcMain.handle('consulto-update', withAudit(updateConsulto, {entity:'consulto', crud:'U'}))

//ipcMain.handle('consulto-delete', async (_, ID_paziente, ID_consulto) => {
function deleteConsulto(entity){
  console.log(`delete consulto+childreen with ID_paziente=${entity.ID_paziente} ID_Consulto=${entity.ID}`);

  const statements = [
    'DELETE FROM valutazione WHERE ID_consulto = @ID_consulto',
    'DELETE FROM trattamento WHERE ID_consulto = @ID_consulto',
    'DELETE FROM esame WHERE ID_consulto = @ID_consulto',
    'DELETE FROM trattamento WHERE ID_consulto = @ID_consulto',
    'DELETE FROM anamnesi_prossima WHERE ID_paziente=@ID_paziente AND ID_consulto=@ID_consulto',
    'DELETE FROM consulto WHERE ID = @ID_consulto',
  ].map(sql => db.prepare(sql));

  const myTransaction = db.transaction((values) => {
    for (const stmt of statements) {
      stmt.run(values);
    }
  });

  // Execute transaction
  myTransaction({ID_paziente: entity.ID_paziente, ID_consulto: entity.ID}); // Provide values as an array

  return entity
}
ipcMain.handle('consulto-delete', withAudit(deleteConsulto, {entity:'consulto', crud:'D'}))