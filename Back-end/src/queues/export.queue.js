import BaseQueue from './base.queue.js';

export class ExportQueue extends BaseQueue {
  constructor(options = {}) {
    super('export', options);
  }
}

export default ExportQueue;

