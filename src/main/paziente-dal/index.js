import { ipcMain, app } from 'electron'
import Database from "better-sqlite3"
import log from 'electron-log'
import * as fs from 'fs'
import path from 'path'
import { getConfig } from '../config'

export {default as paziente} from './paziente.js'
export {default as anamnesiRemota} from './anamnesi-remota.js'
export {default as consulto} from './consulto.js'
export {default as anamnesiProssima} from './anamnesi-prossima.js'
export {default as esame} from './esame.js'
export {default as trattamento} from './trattamento.js'
export {default as valutazione} from './valutazione.js'

export let db
const insertAudit = `INSERT INTO auditing (ID_paziente, ID_entity, entity, crud) VALUES (?, ?, ?, ?)`
const migrationsPath = path.join(app.getAppPath(), 'data/migrations')

export function setupPazienteDAL(config){
  try {
    if (!fs.existsSync(config.dbPath)) {
        throw new Error("Database not found");
    }
      // Initialize the DB
      db = initDatabase(config);

      runMigrations(migrationsPath)

  } catch (error) {
      return { success: false, error: error.message };
  }
  return { success: true };

}

export function executeSQL(sqlStatemnt){
 return db.prepare(sqlStatemnt).all();
}

function initDatabase(config) {
  const dbPath = config.dbPath;
  log.info('dbPAth:'+dbPath)
  let db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

const runMigrations = (folderPath) => {

  // Ensure the migrations table exists
  db.prepare(`
    CREATE TABLE IF NOT EXISTS migration (
      [ID]	          INTEGER PRIMARY KEY AUTOINCREMENT,
      [created_at]    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      [script_name]   nvarchar
    )
  `).run();

  const files = fs
    .readdirSync(folderPath)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const alreadyRun = db
      .prepare('SELECT 1 FROM migration WHERE script_name = ?')
      .get(file);

    if (alreadyRun) {
      log.silly(`⏭Skipping: ${file}`);
      continue;
    }

    const filePath = path.join(folderPath, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    try {
      db.exec(sql);
      db.prepare('INSERT INTO migration (script_name) VALUES (?)').run(file);
      log.info(`Applied: ${file}`);
    } catch (err) {
      log.error(`Error in ${file}:`, err.message);
      break; // Stop on first error to avoid partial execution
    }
  }

  //db.close();
  log.silly('Migrations completed.');
}


/**
 * Wraps a CRUD handler with auditing logic.
 * @param {Function} handler - Your actual CRUD function
 * @param {Object} options - Options for auditing
 * @param {string} options.entity - Entity name (e.g., 'consulto')
 * @param {string} options.crud - 'C', 'R', 'U', or 'D'
 * @returns Wrapped handler for ipcMain
 */
export function withAudit(handler, { entity, crud }) {
  return async (event, targetEntity) => {
    const config = await getConfig()
    try {
      console.log(targetEntity)
      const result = handler(targetEntity)
      if (config.auditing){
        // Assume result contains something like: { id: 42, idPaziente: 10 }
        if (result && result.success !== false) {
          let { ID: idEntity, ID_paziente: idPaziente } = result

          if(entity=='paziente'){
            idPaziente = idEntity
          }

          db.prepare(insertAudit).run(
            idPaziente ?? null,
            idEntity ?? null,
            entity ?? result.tableName,
            crud
          )
        }
      }
      return result;
    } catch (error) {
      console.error(`[withAudit] Error in ${entity} ${crud}:`, error);
      throw error;
    }
  }
}

export function withTryCatch(handler) {
  return async (event, ...args) => {
    try {
      //console.log(args)
      const result = handler(...args)
      return result;
    } catch (error) {
      log.error('IPC Error:', error);
      throw error // Sends error back to renderer
    }
  }
}

function deleteLeaf(deleteEntity){
  console.log(`delete ${deleteEntity.tableName} with ID=${deleteEntity.ID}`)
  const sql = "DELETE FROM "+deleteEntity.tableName+" WHERE ID=?"
  const stmt = db.prepare(sql)
  const info = stmt.run(deleteEntity.ID)
  return deleteEntity
} 
ipcMain.handle('delete-leaf', withAudit(deleteLeaf, {crud:'D'}))