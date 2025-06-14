import BaseBrick from './BaseBrick.js'
class ResponseValidationBrick extends BaseBrick {
  constructor(options = {}) {
    super(options);
    this.minLength = options.minLength || 10;
    this.maxLength = options.maxLength || 10000;
  }

  async process(context) {
    const response = context.currentMessage;
    const validations = {
      hasContent: response && response.length > 0,
      minimumLength: response.length >= this.minLength,
      maximumLength: response.length <= this.maxLength,
      notEmpty: response.trim().length > 0
    };

    const isValid = Object.values(validations).every(Boolean);

    if (!isValid) {
      this.log('Response validation failed:', validations);
      context.updateMessage('I apologize, but I encountered an issue generating a proper response. Please try again.');
    }

    context.addResult('response_validation', {
      validations,
      isValid,
      responseLength: response.length
    });

    return context;
  }
}

export {ResponseValidationBrick}
