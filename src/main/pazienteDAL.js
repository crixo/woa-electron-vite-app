import { ipcMain } from 'electron';

export function setupPazienteDAL(db){
  ipcMain.handle('paziente-add', async (_, p) => {
    try {
      console.log(p);
      const sql = "INSERT INTO paziente (nome,cognome,professione,indirizzo,citta,telefono,cellulare,prov,cap,email,data_nascita) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      const stmt = db.prepare(sql);
      const info = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita);
      const id = info.lastInsertRowid;
      console.log(`id:${id}`);
      p.id = id;
      return p;
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  });

  ipcMain.handle('paziente-search', async (_, searchCriteria) => {
    try {
      console.log('paziente-search:'+searchCriteria);
      const sql = "SELECT * FROM paziente WHERE cognome LIKE ?"
      const res =  db.prepare(sql).all(`%${searchCriteria}%`);
      console.log(res);
  
      const stringify = JSON.stringify(res);
      // console.log(stringify);
      // console.log(JSON.parse(stringify));
  
      return stringify;
      //return {"test":"test"};
      //return "test:";
      //throw new Error('Oops! Something went wrong.');
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  });    

  ipcMain.handle('paziente-get', async (_, pazienteId) => {
    try {
      console.log('paziente-get:'+pazienteId);
      const sql = "SELECT * FROM paziente WHERE ID = ?"
      const res =  db.prepare(sql).get(pazienteId);
      console.log(res);
      const stringify = JSON.stringify(res);      
      return stringify;
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  });       

  ipcMain.handle('paziente-update', async (_, p) => {
    try {
      console.log(p);
      const sql = "UPDATE paziente SET nome=?,cognome=?,professione=?,indirizzo=?,citta=?,telefono=?,cellulare=?,prov=?,cap=?,email=?,data_nascita=? WHERE ID=?";
      const stmt = db.prepare(sql);
      const info = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita,p.ID);
      return p;
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  });  
  
  ipcMain.handle('anamnesiremota-add', async (_, entity) => {
    try {
      console.log('anamnesiremota-add'+entity);
      const sql = "INSERT INTO anamnesi_remota (id_paziente,data,tipo,descrizione) VALUES (?,?,?,?)";
      const stmt = db.prepare(sql);
      const info = stmt.run(entity.pazienteId, entity.data, entity.tipo, entity.descrizione);
      const id = info.lastInsertRowid;
      console.log(`id:${id}`);
      entity.id = id;
      console.log(entity);
      return entity;
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  });  

  ipcMain.handle('anamnesiremota-all', async (_, pazienteId) => {
    try {
      console.log('anamnesiremote-all:'+pazienteId);
      const sql = "SELECT * FROM anamnesi_remota WHERE ID_paziente = ?"
      const res =  db.prepare(sql).all(pazienteId);
      console.log(res);
  
      const stringify = JSON.stringify(res);
      // console.log(stringify);
      // console.log(JSON.parse(stringify));
  
      return stringify;
      //return {"test":"test"};
      //return "test:";
      //throw new Error('Oops! Something went wrong.');
    } catch (error) {
      console.log('IPC Error:', error);
      throw error; // Sends error back to renderer
    }
  }); 
}