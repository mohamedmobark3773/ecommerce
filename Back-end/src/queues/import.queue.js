import BaseQueue from './base.queue.js';

export class ImportQueue extends BaseQueue {
  constructor(options = {}) {
    super('import', options);
  }
}

export default ImportQueue;

