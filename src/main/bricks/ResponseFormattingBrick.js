import BaseBrick from './BaseBrick.js'
import { APIBrick } from './APIBrick.js';
class ResponseFormattingBrick extends BaseBrick {
  constructor(options = {}) {
    super(options)
    this.apiCall = options.apiCall
  }

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
    this.log(hiddenMessage)

    // Create internal context for formatting request
    const formatContext = context.createInternalContext(hiddenMessage);

    context.addUserMessage(hiddenMessage)
    
    // Send to API for formatting (won't add to main conversation history)
    const apiBrick = new APIBrick(this.options);
    //const formatResult = await apiBrick.process(formatContext);
    const formatResult = await apiBrick.process(formatContext);
    context.addAssistantMessage(formatResult.currentMessage)

    // Update the main context with formatted response
    context.updateMessage(formatResult.currentMessage);
    context.addResult('response_formatting', {
      hiddenMessage,
      formattedResponse: formatResult.currentMessage
    });

    return context;
  }

  createFormattingMessage(originalQuestion, sqlResults) {
    let message = `A fronte della seguete domanda dell'utente: "${originalQuestion}"\n\n`;
    message += `Tu hai suggerito le segueri queries. Questi sono i risultati delle lore esecuzioni:\n\n`;
    
    sqlResults.forEach((result, index) => {
      message += `Query ${index + 1}: ${result.sql}\n`;
      if (result.success) {
        message += `Risultato: ${JSON.stringify(result.data, null, 2)}\n`;
        message += `Numero di righe restiruite: ${result.rowCount}\n\n`;
      } else {
        message += `Errore: ${result.error}\n\n`;
      }
    });
    
    message += `Fornire una risposta naturale, leggibile dall'uomo, alla domanda originale dell'utente, basata su questi risultati SQL.`;
    message += `Non mostrate le query SQL o i dati grezzi, ma date solo una risposta chiara e discorsiva su ciò che i dati mostrano.`;
    
    return message;
  }
}
export {ResponseFormattingBrick}
