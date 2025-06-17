class MockSQLExecutor {
  async execute(sql) {
    //this.log('[MockSQLExecutor] Executing:', sql);
    
    if (sql.toLowerCase().includes('select')) {
      return [
        { mese: '01', numero_consulti: 2 },
        { mese: '02', numero_consulti: 5 },
        { mese: '03', numero_consulti: 7 },
        { mese: '04', numero_consulti: 4 },
        { mese: '05', numero_consulti: 8 },
      ];
    }
    
    return { affectedRows: 1, message: 'Query executed successfully' };
  }
}

export {MockSQLExecutor}