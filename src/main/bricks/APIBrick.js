import BaseBrick from './BaseBrick.js'

class APIBrick extends BaseBrick {
  constructor(options = {}) {
    super(options);
    this.maxRetries = options.maxRetries || 1;
    this.isInitialCall = options.isInitialCall !== false; // Default true
    this.apiCall = options.apiCall
  }

  async process(context) {
    // Add user message to history if this is the initial API call
    //if (!context.isInternal()) {
      context.addUserMessage(context.currentMessage);
    //}

    const botAnswer = await this.sendToAPI(
      context.currentMessage, 
      context.getHistory()
    );
    context.addAssistantMessage(botAnswer.content)

    context.updateMessage(botAnswer.content);
    context.addResult('api_response', {
      originalMessage: context.originalMessage,
      //apiResponse: response.content,
      //metadata: response.metadata,
      //isInternal: context.isInternal()
    });

    return context;
  }

  async sendToAPI(message, conversationHistory) {
    //console.log(conversationHistory)
    //console.log(message)
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        var botMessage = await this.apiCall.sendRequest(conversationHistory)

        return {
          content: botMessage.content,
          //metadata: result.metadata || {}
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

export {APIBrick}