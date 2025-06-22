import { fetch } from 'undici';

class OllamaCall {
  constructor(options = {}) {
    this.options = options
  }


  async sendRequest(conversationHistory) {
      
  const body = {
    model: this.options.model,
    messages: conversationHistory,
    stream: false
  }
  //console.log(JSON.stringify(body, null, 2))

  const response = await fetch(this.options.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)//JSON.stringify(body, null, 2)
  });

  const data = await response.json();
// {
//   "model": "llama3",
//   "created_at": "2025-06-22T15:05:12.345678Z",
//   "message": {
//     "role": "assistant",
//     "content": "The top scorer of the 2018 World Cup was Harry Kane of England, with 6 goals."
//   },
//   "done": true
// }

    return {
        content: data.message.content,
        //metadata: result.metadata || {}
    };            
    
  }
}

export {OllamaCall}