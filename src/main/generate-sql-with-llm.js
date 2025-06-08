import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { app } from 'electron'

const model = 'mistral'

// Function to load and normalize the schema from a file
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

// Function to run Mistral via Ollama using a temporary file
function runMistral(schema, userRequest) {
    const fullPrompt = `${schema}\n\n${userRequest}`;
    
    // Write prompt to a temporary file for cleaner execution
    const tempFilePath = path.join(import.meta.dirname, "temp_prompt.txt");
    fs.writeFileSync(tempFilePath, fullPrompt);

    // Execute command via Ollama, reading from temp file
    const command = `ollama run ${model} < ${tempFilePath}`;
    const llmOutput = execSync(command, { encoding: "utf-8" }).trim();

    // Remove temp file after execution
    fs.unlinkSync(tempFilePath);

    return llmOutput;
}

// Function to extract SQL from Mistral's response (inside ```sql ... ```)
function extractSQL(llmOutput) {
    const match = llmOutput.match(/```sql\s+(.*?)\s+```/s);
    return match ? match[1].trim() : "No valid SQL statement found.";
}

// Function to save full LLM output to a timestamped file
function saveOutput(outputFolder, llmOutput) {
    if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filePath = path.join(outputFolder, `${model}_output_${timestamp}.txt`);
    fs.writeFileSync(filePath, llmOutput);

    return filePath;
}

// Open SQLite database
// const db = new Database("~/crixo/woa/xxx-woa.db");

// Function to dynamically format recordset
function formatRecordset(rows) {
    

    if (rows.length === 0) {
        return "The query returned no results.";
    }

    // Extract column names dynamically
    const columnNames = Object.keys(rows[0]);


    //let prompt = "Here is the query result:\n\n";
    const answerPromptPath =  path.join(app.getAppPath(), 'prompts/recordset-to-human.txt')
    let prompt = loadPrompt(answerPromptPath)
    //A
    //Write an engaging, natural summary of this data as if presenting findings to a non-technical audience.

    // Build table header dynamically
    prompt += `\n| ${columnNames.join(" | ")} |\n`;
    prompt += `|${"-".repeat(prompt.length - 2)}|\n`;

    // Add rows dynamically
    rows.forEach(row => {
        const values = columnNames.map(col => row[col]);
        prompt += `| ${values.join(" | ")} |\n`;
    });

    //prompt += "\nCan you summarize this data in a human-friendly way?";
    

    return prompt;
}

export function answerWithLLM(userRequest, db){
// MAIN EXECUTION
// const userRequest = process.argv[2];
// const schemaFile = process.argv[3];
// const outputFolder = process.argv[4];
const schemaFile = path.join(app.getAppPath(), `prompts/schema-mistral2.txt`)
const outputFolder = path.join(app.getAppPath(), 'logs')

if (!userRequest || !schemaFile || !outputFolder) {
    console.log("Usage: node generate_sql.js '<user_request>' <schema_file_path> <output_folder_path>");
    process.exit(1);
}

const schema = loadPrompt(schemaFile);
const llmOutput = runMistral(schema, userRequest);
const extractedSQL = extractSQL(llmOutput);
const outputFile = saveOutput(outputFolder, llmOutput);

console.log("\nExtracted SQL Query:\n", extractedSQL);
console.log(`\nFull LLM output saved to: ${outputFile}`);

// Run SQL query
const rows = db.prepare(extractedSQL).all();
const formattedPrompt = formatRecordset(rows);
console.log(formattedPrompt)

// Pass formatted prompt to Mistral
const response = execSync(`ollama run ${model} "${formattedPrompt.replace(/\n/g, ' ')}"`, { encoding: "utf-8" });
console.log("\nHuman-Friendly Answer:\n", response);
return response
}
