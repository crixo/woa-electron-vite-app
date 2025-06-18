import { app } from 'electron'
import os from 'os'
import fs from 'fs';
import path from 'node:path';
import {ChainBuilder} from './bricks/ChainBuilder.js'
import {APIBrick} from './bricks/APIBrick.js'
import {ProcessingContext} from './bricks/ProcessingContext.js'
import { SQLDetectionBrick } from './bricks/SqlDetectionBrick.js';
import { SQLExecutionBrick } from './bricks/SqlExecutionBrick.js';
import { ResponseFormattingBrick } from './bricks/ResponseFormattingBrick.js';
import {FinalProcessingBrick} from './bricks/FinalProcessingBrick.js'
import { OpenAiCall } from './bricks/OpenAiCall.js';
import { SQLiteSQLExecutor } from './bricks/SQLiteSqlExecutor.js';
import { getConfig } from './config.js';

let conversationHistory
let conversationId

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

function saveHistoryToFile(converationId, conversationHistory){
  const homeDir = os.homedir();
  const historyFile = path.join(homeDir, "/woa/conversations/", `./history-${conversationId}.json`)
  // Ensure the directory exists
  fs.mkdirSync(path.dirname(historyFile), { recursive: true });
  // Save updated history to file    
  fs.writeFileSync(historyFile, JSON.stringify(conversationHistory, null, 2));    
}

console.log('getting config from chat-with-ai')
//const config = await getConfig()
const openAiCall = null//new OpenAiCall(config.aiProviders.azure)
// Create the processing chain
const chain = new ChainBuilder()
  .add(new APIBrick({apiCall: openAiCall}))
  .add(new SQLDetectionBrick({ debug: false }))
  .add(new SQLExecutionBrick({ sqlExecutor: new SQLiteSQLExecutor(), debug: false}))
  .add(new ResponseFormattingBrick({ debug: false, apiCall: openAiCall }))
  .add(new FinalProcessingBrick({ debug: false }))
  .build();

export async function startConversation(params) {
    conversationId = new Date().toISOString().replace(/[:.]/g, '-')
    conversationHistory = []
    const systemMessageContent =  loadPrompt(path.join(app.getAppPath(), 'prompts/woa-db-system-message.md'))
    const systemMessage = { role: "system", content: systemMessageContent }
    conversationHistory.push(systemMessage)
    console.log('new conversation:'+conversationId)
    return conversationId
}

export async function ask(conversationId, userQuestion) {
  console.log(`converationId:${conversationId}`)
  // const conversationHistory = (fs.existsSync(historyFile)) ? JSON.parse(fs.readFileSync(historyFile, "utf-8")) : [];
  let answer
  try {
    const context = new ProcessingContext(
      userQuestion,
      conversationHistory
    );  
    const result = await chain.execute(context);
    conversationHistory = result.getHistory()
    answer=result.currentMessage

    console.log(`\n=== CONVERSATION HISTORY success:${result.success} ===`);
    result.getHistory().forEach((msg, i) => {
      console.log(`${i + 1}. [${msg.role}]: ${msg.content.substring(0, 100)}...`);
    });
  } catch (error) {
    answer = error.message
    console.error('Chain execution failed:', error);
  }  
  saveHistoryToFile(conversationId, conversationHistory)
  return answer
}