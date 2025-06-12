import { app } from 'electron'
import path from 'node:path';
import fs from 'fs';
import { fetch } from 'undici';
import os from 'os'

const apiUrl = "http://localhost:11434/api/chat";
const modelName = "codellama";
let conversationHistory
let conversationId

// Generate a unique filename with timestamp
// const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
// const historyFile = `conversations/history-${timestamp}.json`;

async function sendMessage(message){

    conversationHistory.push(message);
    console.log(conversationHistory)
    const apiMessage = {model: modelName, messages: conversationHistory, stream: false}
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiMessage)
    });
    console.log(response)
    const data = await response.json();

    return data
}

async function sendUserMessage(userQuestion, conversationHistory) {
    try {
        const data = await sendMessage({role:"user", content: userQuestion})
        
        console.log('data', data)
        if (data.message) {
            const botMessage = data.message//{ role: "assistant", content: data.message };
            console.log("Bot:", botMessage.content);
            return botMessage
        } else {
            console.error("Error: Unexpected response format.");
            return "Error: Unexpected response format."
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return error
    }
}

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

export async function startConversation(params) {
    conversationId = new Date().toISOString().replace(/[:.]/g, '-')
    conversationHistory = []
    const systemMessageContent =  loadPrompt(path.join(app.getAppPath(), 'prompts/woa-db-system-message.md'))
    const systemMessage = { role: "system", content: systemMessageContent }
    const response = await sendMessage(systemMessage)
    console.log('new conversation:'+conversationId)
    return conversationId
}

export async function ask(conversationId, question) {
    console.log(conversationId)
    console.log(question)
    const homeDir = os.homedir();
    const historyFile = path.join(homeDir, "/woa/conversations/", `./history-${conversationId}.json`)
    // const conversationHistory = (fs.existsSync(historyFile)) ?  
    //     JSON.parse(fs.readFileSync(historyFile, "utf-8")) 
    //     : [];

    const botAnswer = await sendUserMessage(question)

    conversationHistory.push(botAnswer);

    // check if answer contains SQL statement

    // if yes, execute it

    // convert sql recorset to text rpresentation

    // send a message/history to convert the recorset into a human readable answer

    // return the answer to caller

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(historyFile), { recursive: true });
    // Save updated history to file    
    fs.writeFileSync(historyFile, JSON.stringify(conversationHistory, null, 2));    

    return botAnswer.content
}