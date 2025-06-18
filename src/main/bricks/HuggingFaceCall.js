import { InferenceClient } from "@huggingface/inference";

class HuggingFaceCall {
  constructor(options = {}) {
    this.options = options
  }

  async sendRequest(conversationHistory) {
    const apiKey = this.options.token

    const client = new InferenceClient(this.options.token);
    const chatCompletion = await client.chatCompletion({
        // provider: "novita",
        // model: "deepseek-ai/DeepSeek-V3-0324",
        provider: "nscale",
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",   
        // provider: "featherless-ai",
        // model: "defog/llama-3-sqlcoder-8b", // non fornisce i richiesti delimitatori per statement SQL
        messages: conversationHistory,
    });

    const botMessage = chatCompletion.choices[0].message
    console.log(botMessage);

    return {
        content: botMessage.content,
       // metadata: result.metadata || {}
    };            
    
  }
}

export {HuggingFaceCall}