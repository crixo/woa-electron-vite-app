class FakeCall {
  constructor(options = {}) {
    this.options = options
  }

  async sendRequest(conversationHistory) {
      
    return {
        content: "pong"
    };        
    
  }
}

export {FakeCall}