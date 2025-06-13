//import { app } from 'electron'
import fs from 'fs';
import path from 'node:path';
import {ChainBuilder} from './bricks/ChainBuilder.js'
import {OpenApiBrick} from './bricks/OpenApiBrick.js'
import {ProcessingContext} from './bricks/ProcessingContext.js'
import {FinalProcessingBrick} from './bricks/FinalProcessingBrick.js'


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
const openApiConfiguration = getOpenApiConfiguration(filePath);
//console.log(openApiConfiguration);



async function demonstrateChainUsage() {
  // Create the processing chain
  const chain = new ChainBuilder()
    .add(new OpenApiBrick(openApiConfiguration))
    // .add(new SQLDetectionBrick({ debug: true }))
    // .add(new SQLExecutionBrick({ 
    //   sqlExecutor: new MockSQLExecutor(),
    //   debug: true 
    // }))
    // .add(new ResponseFormattingBrick({ debug: true }))
    // .add(new ResponseValidationBrick({ debug: true }))
    .add(new FinalProcessingBrick({ debug: true }))
    .build();

  // Process a message
  const context = new ProcessingContext(
    "Show me all users in the engineering department",
    []
  );

  try {
    const result = await chain.execute(context);
    
    console.log('\n=== FINAL RESULT ===');
    console.log('Success:', result.success);
    console.log('Final Response:', result.currentMessage);
    console.log('\n=== CONVERSATION HISTORY ===');
    result.getHistory().forEach((msg, i) => {
      console.log(`${i + 1}. [${msg.role}]: ${msg.content.substring(0, 100)}...`);
    });
    console.log('\n=== HISTORY STATS ===');
    console.log(result.getHistoryStats());
    
  } catch (error) {
    console.error('Chain execution failed:', error);
  }
}

demonstrateChainUsage()