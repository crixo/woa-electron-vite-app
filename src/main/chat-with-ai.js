import { app, ipcMain } from 'electron'
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
import { HuggingFaceCall } from './bricks/HuggingFaceCall.js';
import { SQLiteSQLExecutor } from './bricks/SQLiteSqlExecutor.js';
import { getConfig } from './config.js';
import { FakeCall } from './bricks/FakeCall.js';
import { OllamaCall } from './bricks/OllamaCall.js';

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

function createApiCallForProvider(aiProvider, config){

  switch (aiProvider) {
      case "azure":
          return new OpenAiCall(config.aiProviders.azure)
          break;
      case "ollama":
          return new OllamaCall(config.aiProviders.ollama)
          break;
      case "huggingFace":
          return new HuggingFaceCall(config.aiProviders.huggingFace)
          break;
      default:
          throw new Error(`AI provider ${aiProvider} not supported`)
  }
}

let chain
export async function startConversation(aiProvider) {
    conversationId = new Date().toISOString().replace(/[:.]/g, '-')
    conversationHistory = []
    const systemMessageContent =  loadPrompt(path.join(app.getAppPath(), 'prompts/woa-db-system-message.md'))
    const systemMessage = { role: "system", content: systemMessageContent }
    conversationHistory.push(systemMessage)
    console.log('new conversation:'+conversationId+' for '+aiProvider)
    const config = await getConfig()
    const apiCall = createApiCallForProvider(aiProvider, config)
    chain = new ChainBuilder()
      .add(new APIBrick({apiCall: apiCall}))
      .add(new SQLDetectionBrick({ debug: false }))
      .add(new SQLExecutionBrick({ sqlExecutor: new SQLiteSQLExecutor(), debug: false}))
      .add(new ResponseFormattingBrick({ debug: false, apiCall: apiCall }))
      .add(new FinalProcessingBrick({ debug: false }))
      .build();

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
      if(msg.content){
        console.log(`${i + 1}. [${msg.role}]: ${msg.content.substring(0, 100)}...`);
      }else{
        console.log('msg.content is undefined for: ',msg)
      }
    });
  } catch (error) {
    answer = error.message
    console.error('Chain execution failed:', error);
  }  
  saveHistoryToFile(conversationId, conversationHistory)
  return answer
}

ipcMain.handle('ai-start-conversation', async (_, aiProvider) => {
  try {
    return startConversation(aiProvider)
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});

ipcMain.handle('ai-ask', async (_, conversationId, question) => {
  try {
    return ask(conversationId, question)
  } catch (error) {
    console.log('IPC Error:', error)
    throw error // Sends error back to renderer
  }
});