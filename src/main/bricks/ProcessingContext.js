// Context object that flows through the chain
class ProcessingContext {
  constructor(originalMessage, conversationHistory = []) {
    this.originalMessage = originalMessage;
    this.currentMessage = originalMessage;
    this.conversationHistory = [...conversationHistory]; // Clone to avoid mutations
    this.metadata = {};
    this.results = [];
    this.success = true;
    this.stop = false;
    this.error = null
    this.timestamp = new Date().toISOString();
    this.userMessageAdded = false;
    this.assistantMessageAdded = false;
  }

  // Add result from a brick
  addResult(brickName, data) {
    this.results.push({
      brick: brickName,
      data,
      timestamp: new Date().toISOString()
    });
  }

  // Update the current message
  updateMessage(newMessage) {
    this.currentMessage = newMessage;
  }

  // Add metadata
  setMetadata(key, value) {
    this.metadata[key] = value;
  }

  // Get metadata
  getMetadata(key) {
    return this.metadata[key];
  }

  // === CENTRALIZED HISTORY MANAGEMENT ===

  // Add user message to history (called once at the beginning)
  addUserMessage(message) {
    this.conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });
  }

  // Add assistant message to history (called once at the end)
  addAssistantMessage(message) {
      this.conversationHistory.push({
        role: 'assistant',
        content: message,
        timestamp: new Date().toISOString()
      })
  }

  // Create a context for internal API calls (like formatting)
  // This doesn't affect the main conversation history
  createInternalContext(message) {
    const internalContext = new ProcessingContext(message, this.conversationHistory);
    // Mark as internal so it won't add to history
    internalContext.setMetadata('isInternal', true);
    return internalContext;
  }

  // Check if this is an internal processing context
  isInternal() {
    return this.getMetadata('isInternal') === true;
  }

  // Get the current conversation history
  getHistory() {
    return [...this.conversationHistory]; // Return a copy
  }

  // Get conversation stats
  getHistoryStats() {
    const userMessages = this.conversationHistory.filter(m => m.role === 'user').length;
    const assistantMessages = this.conversationHistory.filter(m => m.role === 'assistant').length;
    
    return {
      total: this.conversationHistory.length,
      userMessages,
      assistantMessages,
      // userMessageAdded: this.userMessageAdded,
      // assistantMessageAdded: this.assistantMessageAdded
    };
  }

  setError(error){
    this.stop = true
    this.success = false
    this.error = error
    this.updateMessage(error.message)
  }
}


export {ProcessingContext}