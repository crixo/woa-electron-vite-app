import BaseBrick from './BaseBrick.js'
class SQLDetectionBrick extends BaseBrick {
  constructor(options = {}) {
    super(options);
    this.sqlPatterns = [
      /```sql\s*([\s\S]*?)\s*```/gi,
      /```\s*(SELECT[\s\S]*?)\s*```/gi,
      /```\s*(INSERT[\s\S]*?)\s*```/gi,
      /```\s*(UPDATE[\s\S]*?)\s*```/gi,
      /```\s*(DELETE[\s\S]*?)\s*```/gi
    ];
  }

  async process(context) {
    const sqlStatements = this.extractSQL(context.currentMessage);
    
    if (sqlStatements.length > 0) {
      this.log(`Detected ${sqlStatements.length} SQL statements`);
      context.setMetadata('sqlStatements', sqlStatements);
      context.setMetadata('hasSql', true);
      context.addResult('sql_detection', { 
        statements: sqlStatements,
        count: sqlStatements.length 
      });
    } else {
      context.setMetadata('hasSql', false);
      this.log('No SQL detected');
    }

    return context;
  }

  extractSQL(content) {
    const sqlStatements = [];
    
    for (const pattern of this.sqlPatterns) {
      const matches = [...content.matchAll(pattern)];
      matches.forEach(match => {
        let sql = match[1] || match[0];
        sql = sql.replace(/```sql|```/g, '').trim();
        if (sql && !sqlStatements.includes(sql)) {
          sqlStatements.push(sql);
        }
      });
    }
    
    return sqlStatements;
  }
}

export {SQLDetectionBrick}