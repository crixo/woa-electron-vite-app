class BaseBrick {
  constructor(options = {}) {
    this.options = options;
    this.nextBrick = null;
    this.debug = options.debug || false;
  }

  // Chain this brick to the next one
  chain(nextBrick) {
    this.nextBrick = nextBrick;
    return nextBrick; // Allow fluent chaining
  }

  // Main processing method - override in subclasses
  async process(context) {
    throw new Error('process() method must be implemented in subclass');
  }

  // Execute this brick and pass to next
  async execute(context) {
    try {
      this.log(`Processing with ${this.constructor.name}`);
      
      // Process current brick
      const result = await this.process(context);
      
      // If processing should stop, return result
      if (result.stop) {
        this.log(`Chain stopped at ${this.constructor.name}`);
        return result;
      }

      // Pass to next brick if exists
      if (this.nextBrick) {
        return await this.nextBrick.execute(result);
      }

      return result;
    } catch (error) {
      this.log(`Error in ${this.constructor.name}:`, error);
      return {
        ...context,
        error: error.message,
        stop: true,
        success: false
      };
    }
  }

  log(...args) {
    if (this.debug) {
      console.log(`[${this.constructor.name}]`, ...args);
    }
  }
}

export default BaseBrick