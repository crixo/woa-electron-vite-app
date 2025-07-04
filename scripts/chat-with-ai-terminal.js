//import { app } from 'electron'
import fs from 'fs';
import path from 'node:path';
import {ChainBuilder} from '../src/main/bricks/ChainBuilder.js'
import {APIBrick} from '../src/main/bricks/APIBrick.js'
import {ProcessingContext} from '../src/main/bricks/ProcessingContext.js'
import { SQLDetectionBrick } from '../src/main/bricks/SqlDetectionBrick.js';
import { SQLExecutionBrick } from '../src/main/bricks/SqlExecutionBrick.js';
import { MockSQLExecutor } from '../src/main/bricks/MockSqlExecutor.js';
import { ResponseFormattingBrick } from '../src/main/bricks/ResponseFormattingBrick.js';
import {FinalProcessingBrick} from '../src/main/bricks/FinalProcessingBrick.js'
import { OpenAiCall } from '../src/main/bricks/OpenAiCall.js';
// import Database from "better-sqlite3";


// Function to read the file and parse the key-value pairs
const getOpenApiConfiguration = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n'); // Split the content by line

    const result = {};

    lines.forEach(line => {
        if (line.trim()) { // Ensure the line is not empty
            const [key, ...valueParts] = line.split(':'); // Stop at first occurrence of ':'
            result[key.trim()] = valueParts.join(':').trim(); // Preserve any additional colons in value
        }
    });

    return result;
};

// Example usage
//const filePath = path.join(app.getAppPath(), 'private/open-ai-secrets.txt')
const filePath = path.join('../../', 'private/open-ai-secrets.txt')
const openAiConfiguration = getOpenApiConfiguration(filePath);
//console.log(openApiConfiguration);


function loadPrompt(promptPath) {
    try {
        let prompt = fs.readFileSync(promptPath, "utf-8");
        prompt = prompt.replace(/\r/g, "").trim();  // Remove carriage returns (Windows/macOS)
        return prompt;
    } catch (error) {
        console.error(`Error: Prompt file '${promptPath}' not found.`);
        process.exit(1);
    }
}
const sytemPromptPath = path.join('../../', 'prompts/woa-db-system-message.md')
const sytemPrompt = loadPrompt(sytemPromptPath)

// function initDatabase(dbPath) {
//   let db = new Database(dbPath);
//   db.pragma("journal_mode = WAL");
//   return db;
// }
// const db = initDatabase('../../private/woa-sample.db')

const openAiCall = new OpenAiCall(openAiConfiguration)
async function demonstrateChainUsage() {
  // Create the processing chain
  const chain = new ChainBuilder()
    .add(new APIBrick({apiCall: openAiCall}))
    .add(new SQLDetectionBrick({ debug: true }))
    .add(new SQLExecutionBrick({ 
      sqlExecutor: new MockSQLExecutor(),
      debug: false 
    }))
    .add(new ResponseFormattingBrick({ debug: true, apiCall: openAiCall }))
    // .add(new ResponseValidationBrick({ debug: true }))
    .add(new FinalProcessingBrick({ debug: false }))
    .build();



  function printResult(result){
    console.log('\n=== FINAL RESULT ===');
    console.log('Success:', result.success);
    console.log('Final Response:', result.currentMessage);
    console.log('\n=== CONVERSATION HISTORY ===');
    result.getHistory().forEach((msg, i) => {
      console.log(`${i + 1}. [${msg.role}]: ${msg.content.substring(0, 100)}...`);
    });
    console.log('\n=== HISTORY STATS ===');
    console.log(result.getHistoryStats());
  }

  try {
  // Process a message
  const context = new ProcessingContext(
    "Conta i consulti dell'anno corrente raggruppati per mese",
    [{role:"system",content:sytemPrompt}]
  );    
    const result = await chain.execute(context);

  // Process a message
  const context2 = new ProcessingContext(
    "Conta i consulti dell'anno 2024 raggruppati per mese",
    context.getHistory()
  );    
    printResult(result)
    const result2 = await chain.execute(context2);  
    printResult(result2)
  } catch (error) {
    console.error('Chain execution failed:', error);
  }
}

demonstrateChainUsage()