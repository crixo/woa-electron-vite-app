import { ipcMain } from 'electron';
import Database from "better-sqlite3";
import log from 'electron-log';
import * as fs from 'fs';
import { ask, startConversation } from './chat-with-llm';

let db

export function setupPazienteDAL(config){
  try {
    if (!fs.existsSync(config.dbPath)) {
        throw new Error("Database not found");
    }
      // Initialize the DB
      db = initDatabase(config);

  } catch (error) {
      return { success: false, error: error.message };
  }
  return { success: true };

}

function initDatabase(config) {
  const dbPath = config.dbPath;
  log.info('dbPAth:'+dbPath)
  let db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

ipcMain.handle('paziente-add', async (_, p) => {
  try {
    console.log(p);
    const sql = "INSERT INTO paziente (nome,cognome,professione,indirizzo,citta,telefono,cellulare,prov,cap,email,data_nascita) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const stmt = db.prepare(sql);
    const info = stmt.run(p.nome,p.cognome,p.professione,p.indirizzo,p.citta,p.telefono,p.cellulare,p.prov,p.cap,p.email,p.data_nascita);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    p.ID = id;
    return p;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});

ipcMain.handle('paziente-search', async (_, searchCriteria, pageSize, pageNumber) => {
  try {
    console.log(`paziente-search:${searchCriteria} pageSize:${pageSize} pageNumber:${pageNumber}`);
    const sql = "SELECT * FROM paziente WHERE cognome LIKE ? LIMIT ? OFFSET ?"
    const res =  db.prepare(sql).all(`%${searchCriteria}%`, pageSize, (pageSize-1) * pageNumber);
    // const sql = "SELECT * FROM paziente WHERE cognome LIKE ?"
    // const res =  db.prepare(sql).all(`%${searchCriteria}%`);
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
    const info = stmt.run(entity.ID_paziente, entity.data, entity.tipo, entity.descrizione);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
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

ipcMain.handle('anamnesiremota-update', async (_, entity) => {
  try {
    console.log('anamnesiremota-update:'+entity);
    const sql = "UPDATE anamnesi_remota SET data=?,tipo=?,descrizione=? WHERE ID = ?"
    db.prepare(sql).run(entity.data, entity.tipo, entity.descrizione, entity.ID);
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('consulto-all', async (_, pazienteId) => {
  try {
    console.log('consulti-all:'+pazienteId);
    const sql = "SELECT * FROM consulto WHERE ID_paziente = ?"
    const res =  db.prepare(sql).all(pazienteId);
    console.log(res);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});  


ipcMain.handle('consulto-add', async (_, entity) => {
  try {
    console.log('consulto-add'+entity);
    const sql = "INSERT INTO consulto (ID_paziente,data,problema_iniziale) VALUES (?,?,?)";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.ID_paziente, entity.data, entity.problema_iniziale);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});  

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
});     

ipcMain.handle('consulto-update', async (_, entity) => {
  try {
    console.log('consulto-update:'+entity);
    const sql = "UPDATE consulto SET data=?,problema_iniziale=? WHERE ID = ?"
    db.prepare(sql).run(entity.data, entity.problema_iniziale, entity.ID);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});   

ipcMain.handle('consulto-delete', async (_, ID_paziente, ID_consulto) => {
  try {
    console.log(`delete consulto+childreen with ID_paziente=${ID_paziente} ID_Consulto=${ID_consulto}`);

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
    myTransaction({ID_paziente: ID_paziente, ID_consulto: ID_consulto}); // Provide values as an array

    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});   

ipcMain.handle('anamnesi-prossima-add', async (_, entity) => {
  try {
    console.log('anamnesi-prossima-add'+entity);
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Esame');
    const sql = "INSERT INTO anamnesi_prossima (ID_paziente,ID_consulto,prima_volta,tipologia,localizzazione,irradiazione,periodo_insorgenza,durata,familiarita,altre_terapie,varie) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const stmt = db.prepare(sql);
    stmt.run(entity.ID_paziente, entity.ID_consulto, entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie);
    //const id = info.lastInsertRowid;
    //console.log(`id:${id}`);
    //entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('anamnesi-prossima-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM anamnesi_prossima WHERE ID_consulto= ?"
    const res =  db.prepare(sql).all(idConsulto);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});  

ipcMain.handle('anamnesi-prossima-update', async (_, entity) => {
  try {
    console.log('anamnesi-prossima-add'+entity);
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Esame');
    const sql = "UPDATE anamnesi_prossima SET prima_volta=?,tipologia=?,localizzazione=?,irradiazione=?,periodo_insorgenza=?,durata=?,familiarita=?,altre_terapie=?,varie=? WHERE ID_paziente=? AND ID_consulto=?";
    const stmt = db.prepare(sql);
    stmt.run(entity.prima_volta, entity.tipologia, entity.localizzazione, entity.irradiazione,entity.periodo_insorgenza,entity.durata,entity.familiarita,entity.altre_terapie,entity.varie, entity.ID_paziente, entity.ID_consulto);
    //const id = info.lastInsertRowid;
    //console.log(`id:${id}`);
    //entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});   

ipcMain.handle('anamnesi-prossima-delete', async (_, ID_paziente, ID_consulto) => {
  try {
    console.log(`delete anamnesi_prossima with ID_paziente=${ID_paziente} ID_Consulto=${ID_consulto}`);
    const sql = "DELETE FROM anamnesi_prossima WHERE ID_paziente=? AND ID_consulto=?";
    const stmt = db.prepare(sql);
    const info = stmt.run(ID_paziente, ID_consulto);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});     


ipcMain.handle('esame-add', async (_, entity) => {
  try {
    console.log('esame-add'+entity);
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Esame');
    const sql = "INSERT INTO esame (ID_paziente,ID_consulto,data,tipo,descrizione) VALUES (?,?,?,?,?)";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.data, entity.tipo, entity.descrizione);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('esame-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM esame WHERE ID_consulto = ?"
    const res =  db.prepare(sql).all(idConsulto);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

ipcMain.handle('esame-update', async (_, entity) => {
  try {
    console.log('esame-add'+entity);
    const sql = "UPDATE esame SET data=?,tipo=?,descrizione=? WHERE ID=?";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.data, entity.tipo, entity.descrizione, entity.ID);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});  


ipcMain.handle('trattamento-add', async (_, entity) => {
  try {
    console.log('trattamento-add'+entity);
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Trattamento');
    const sql = "INSERT INTO trattamento (ID_paziente,ID_consulto,data,descrizione) VALUES (?,?,?,?)";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.data, entity.descrizione);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('trattamento-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM trattamento WHERE ID_consulto = ?"
    const res =  db.prepare(sql).all(idConsulto);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

ipcMain.handle('trattamento-update', async (_, entity) => {
  try {
    console.log('trattamento-add'+entity);
    const sql = "UPDATE trattamento SET data=?,descrizione=? WHERE ID=?";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.data, entity.descrizione, entity.ID);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

ipcMain.handle('valutazione-add', async (_, entity) => {
  try {
    console.log('valutazione-add'+entity);
    if(entity.ID_paziente===null || entity.ID_consulto===null) throw new Error('ID_paziente and ID_consulto are mandatory to save Valutazione');
    const sql = "INSERT INTO valutazione (ID_paziente,ID_consulto,strutturale,cranio_sacrale,ak_ortodontica) VALUES (?,?,?,?,?)";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.ID_paziente, entity.ID_consulto, entity.strutturale, entity.cranio_sacrale, entity.ak_ortodontica);
    const id = info.lastInsertRowid;
    console.log(`id:${id}`);
    entity.ID = id;
    console.log(entity);
    return entity;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
}); 

ipcMain.handle('valutazione-all', async (_, idConsulto) => {
  try {
    const sql = "SELECT * FROM valutazione WHERE ID_consulto = ?"
    const res =  db.prepare(sql).all(idConsulto);
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});    

ipcMain.handle('valutazione-update', async (_, entity) => {
  try {
    console.log('valutazione-update');
    console.log(entity);
    const sql = "UPDATE valutazione SET strutturale=?,cranio_sacrale=?,ak_ortodontica=? WHERE ID=?";
    const stmt = db.prepare(sql);
    const info = stmt.run(entity.strutturale, entity.cranio_sacrale, entity.ak_ortodontica, entity.ID);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});      

ipcMain.handle('delete-leaf', async (_, tableName, ID) => {
  try {
    console.log(`delete ${tableName} with ID=${ID}`);
    const sql = "DELETE FROM "+tableName+" WHERE ID=?";
    const stmt = db.prepare(sql);
    const info = stmt.run(ID);
    return true;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});      

ipcMain.handle('tipo-esami', async (_) => {
  try {
    const sql = "SELECT * FROM lkp_esame"
    const res =  db.prepare(sql).all();
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});     

ipcMain.handle('tipo-anamnesi-remota', async (_) => {
  try {
    const sql = "SELECT * FROM lkp_anamnesi"
    const res =  db.prepare(sql).all();
    const stringify = JSON.stringify(res);
    return stringify;
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});  

ipcMain.handle('ai-start-conversation', async (_,) => {
  try {
    return startConversation()
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});

ipcMain.handle('ai-ask', async (_, conversationId, question) => {
  try {
    return ask(conversationId, question)
  } catch (error) {
    console.log('IPC Error:', error);
    throw error; // Sends error back to renderer
  }
});