import BaseBrick from './BaseBrick.js'
import { AzureOpenAI } from "openai"

class OpenApiBrick extends BaseBrick {
  constructor(options = {}) {
    super(options);
    this.apiEndpoint = options.AZURE_OPENAI_ENDPOINT || '/api/chat';
    this.apiKey = options.AZURE_OPENAI_API_KEY;
    this.maxRetries = options.maxRetries || 1;
    this.isInitialCall = options.isInitialCall !== false; // Default true
  }

  async process(context) {
    // Add user message to history if this is the initial API call
    if (!context.isInternal()) {
      const added = context.addUserMessage();
    }

    const response = await this.sendToAPI(
      context.currentMessage, 
      context.getHistory()
    );

    context.updateMessage(response.content);
    context.addResult('api_response', {
      originalMessage: context.originalMessage,
      apiResponse: response.content,
      metadata: response.metadata,
      isInternal: context.isInternal()
    });

    return context;
  }

  async sendToAPI(message, conversationHistory) {
    console.log(conversationHistory)
    console.log(message)

    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // const response = await fetch(this.apiEndpoint, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payload)
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        // }

        //const result = await response.json();
        // const result = { role: "assistant", content: "sono qui per aiutare" }
        // return {
        //   content: result.response || result.message || result.content,
        //   metadata: result.metadata || {}
        // };        

        const endpoint = this.options.AZURE_OPENAI_ENDPOINT
        const apiKey = this.options.AZURE_OPENAI_API_KEY 
        const apiVersion = "2025-01-01-preview";
        const deployment = "model-router"; // This must match your deployment name

        const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

        const result = await client.chat.completions.create({
            messages: conversationHistory,
            max_tokens: 8192,
            temperature: 0.7,
            top_p: 0.95,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: null
        });

        //console.log(JSON.stringify(result, null, 2));
        var botMessage = result.choices[0].message

        return {
          content: botMessage.content,
          metadata: result.metadata || {}
        };            

      } catch (error) {
        lastError = error;
        if (attempt < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    throw new Error(`API failed after ${this.maxRetries} attempts: ${lastError.message}`);
  }
}

export {OpenApiBrick}