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

ipcMain.handle('esame-update', async (_, entity) => {
  try {
    console.log('esame-add'+entity)
    const sql = "UPDATE esame SET data=?,tipo=?,descrizione=? WHERE ID=?";
    const stmt = db.prepare(sql)
    const info = stmt.run(entity.data, entity.tipo, entity.descrizione, entity.ID)
    return true
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});  