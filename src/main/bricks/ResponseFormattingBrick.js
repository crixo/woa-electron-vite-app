class ResponseFormattingBrick extends BaseBrick {
  async process(context) {
    // If no SQL was executed, return original response
    if (!context.getMetadata('hasSql')) {
      this.log('No SQL formatting needed');
      return context;
    }

    const sqlResults = context.getMetadata('sqlResults');
    const hiddenMessage = this.createFormattingMessage(
      context.originalMessage,
      sqlResults
    );

    // Create new context for formatting request
    const formatContext = new ProcessingContext(hiddenMessage, context.conversationHistory);
    
    // Send to API for formatting
    const apiBrick = new APIBrick(this.options);
    const formatResult = await apiBrick.process(formatContext);

    // Update the main context with formatted response
    context.updateMessage(formatResult.currentMessage);
    context.addResult('response_formatting', {
      hiddenMessage,
      formattedResponse: formatResult.currentMessage
    });

    return context;
  }

  createFormattingMessage(originalQuestion, sqlResults) {
    let message = `Based on the user's question: "${originalQuestion}"\n\n`;
    message += `You previously suggested SQL queries. Here are the execution results:\n\n`;
    
    sqlResults.forEach((result, index) => {
      message += `Query ${index + 1}: ${result.sql}\n`;
      if (result.success) {
        message += `Result: ${JSON.stringify(result.data, null, 2)}\n`;
        message += `Rows returned: ${result.rowCount}\n\n`;
      } else {
        message += `Error: ${result.error}\n\n`;
      }
    });
    
    message += `Please provide a natural, human-readable answer to the user's original question based on these SQL results. `;
    message += `Do not show the SQL queries or raw data - just give a clear, conversational response about what the data shows.`;
    
    return message;
  }
}
