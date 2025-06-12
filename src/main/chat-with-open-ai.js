//import { AzureOpenAI } from "openai";
//import { app } from 'electron'
import fs from 'fs';
import path from 'node:path';

// Function to read the file and parse the key-value pairs
const parseFile = (filePath) => {
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
const parsedData = parseFile(filePath);
console.log(parsedData);



// export async function main() {
//   // You will need to set these environment variables or edit the following values
//   const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://prova-02.openai.azure.com/";
//   const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<REPLACE_WITH_YOUR_KEY_VALUE_HERE>";
//   const apiVersion = "2025-01-01-preview";
//   const deployment = "model-router"; // This must match your deployment name

//   const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

//   const result = await client.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are an AI assistant that helps people find information." }
//     ],
//     max_tokens: 8192,
//       temperature: 0.7,
//       top_p: 0.95,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       stop: null
//   });

//   console.log(JSON.stringify(result, null, 2));
// }

// main().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });