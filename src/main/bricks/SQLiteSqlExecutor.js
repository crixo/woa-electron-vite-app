import { executeSQL } from "../paziente-dal/index";

class SQLiteSQLExecutor {

  async execute(sql) {
    //this.log('[MockSQLExecutor] Executing:', sql);
    
    if (sql.toLowerCase().includes('select')) {
      return executeSQL(sql);
    }
    
    throw (`SQL statement not valid: ${sql}`)
  }
}

export {SQLiteSQLExecutor}