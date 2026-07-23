export class QueueInterface {
  constructor() {
    if (new.target === QueueInterface) {
      throw new Error('QueueInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async addJob(name, data, options = {}) {
    throw new Error('QueueInterface.addJob() must be implemented.');
  }

  async getJob(jobId) {
    throw new Error('QueueInterface.getJob() must be implemented.');
  }

  async removeJob(jobId) {
    throw new Error('QueueInterface.removeJob() must be implemented.');
  }

  async process(handler) {
    throw new Error('QueueInterface.process() must be implemented.');
  }
}

export default QueueInterface;

