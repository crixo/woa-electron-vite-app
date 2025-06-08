import BaseBrick from './BaseBrick.js'
class SQLExecutionBrick extends BaseBrick {
  constructor(options = {}) {
    super(options);
    this.sqlExecutor = options.sqlExecutor;
  }

  async process(context) {
    // Skip if no SQL detected
    if (!context.getMetadata('hasSql')) {
      this.log('No SQL to execute, skipping');
      return context;
    }

    if (!this.sqlExecutor) {
      throw new Error('SQL executor not configured');
    }

    const sqlStatements = context.getMetadata('sqlStatements');
    const results = [];

    for (const sql of sqlStatements) {
      try {
        this.log('Executing SQL:', sql);
        const result = await this.sqlExecutor.execute(sql);
        results.push({
          sql,
          success: true,
          data: result,
          rowCount: Array.isArray(result) ? result.length : 0
        });
      } catch (error) {
        this.log('SQL execution error:', error);
        results.push({
          sql,
          success: false,
          error: error.message
        });
      }
    }

    context.setMetadata('sqlResults', results);
    context.addResult('sql_execution', { results });

    return context;
  }
}

export {SQLExecutionBrick}