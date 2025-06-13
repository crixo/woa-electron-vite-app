class MockSQLExecutor {
  async execute(sql) {
    console.log('[MockSQLExecutor] Executing:', sql);
    
    if (sql.toLowerCase().includes('select')) {
      return [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing' }
      ];
    }
    
    return { affectedRows: 1, message: 'Query executed successfully' };
  }
}