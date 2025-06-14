import { AzureOpenAI } from "openai"

class OpenAiCall {
  constructor(options = {}) {
    this.options = options
  }


  async sendRequest(conversationHistory) {
      
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
    
  }
}

export {OpenAiCall}