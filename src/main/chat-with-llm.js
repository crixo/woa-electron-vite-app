import readline from 'readline';
import fs from 'fs';
import { fetch } from 'undici';

const apiUrl = "http://localhost:11434/api/chat";
const modelName = "mistral";

// Generate a unique filename with timestamp
// const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
// const historyFile = `conversations/history-${timestamp}.json`;

async function sendMessage(userMessage, conversationHistory) {
    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: userMessage });

    //console.log(conversationHistory)

    // Prepare request payload in JSON format
    const payload = {
        model: modelName,
        messages: conversationHistory,
        stream: false
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        //console.log(data)

        // Extract and print only the bot's message, avoiding raw JSON output
        if (data.message) {
            const botMessage = data.message//{ role: "assistant", content: data.message };
            conversationHistory.push(botMessage);

            // Save updated history to file
            fs.writeFileSync(historyFile, JSON.stringify(conversationHistory, null, 2));

            console.log("\n🤖 Bot:", botMessage.content);

            return botMessage.content
        } else {
            console.error("❌ Error: Unexpected response format.");
            return "Error: Unexpected response format."
        }
    } catch (error) {
        console.error("🚨 Fetch error:", error);
        return error
    }
}

export async function ask(conversationId, question) {
    const historyFile = `conversations/history-${conversationId}.json`
    const conversationHistory = (fs.existsSync(historyFile)) ?  
        JSON.parse(fs.readFileSync(historyFile, "utf-8")) 
        : [];

    const answer = await sendMessage(question, conversationHistory)

    return answer
}

