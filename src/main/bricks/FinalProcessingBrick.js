import BaseBrick from './BaseBrick.js'

class FinalProcessingBrick extends BaseBrick {
  async process(context) {
    // Add the final assistant response to conversation history
    const added = context.addAssistantMessage();
    
    if (added) {
      this.log('Added assistant response to conversation history');
    }

    // Add final processing results
    context.addResult('final_processing', {
      historyStats: context.getHistoryStats(),
      finalResponse: context.currentMessage,
      processingComplete: true
    });

    this.log(`Processing complete. History stats:`, context.getHistoryStats());
    return context;
  }
}

export {FinalProcessingBrick}