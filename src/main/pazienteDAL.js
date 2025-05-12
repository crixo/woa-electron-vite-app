import { ipcMain } from 'electron';

export function setupPazienteDAL(db){
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
}