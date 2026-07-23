export class BaseJob {
  constructor(name) {
    this.name = name;
  }

  async run(payload = {}) {
    throw new Error(`${this.name} must implement run(payload).`);
  }
}

export default BaseJob;

