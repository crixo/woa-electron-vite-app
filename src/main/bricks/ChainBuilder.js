// Chain Builder for easy setup
class ChainBuilder {
  constructor() {
    this.firstBrick = null;
    this.currentBrick = null;
  }

  add(brick) {
    if (!this.firstBrick) {
      this.firstBrick = brick;
      this.currentBrick = brick;
    } else {
      this.currentBrick.chain(brick);
      this.currentBrick = brick;
    }
    return this; // Fluent interface
  }

  build() {
    return this.firstBrick;
  }
}

export {ChainBuilder} 