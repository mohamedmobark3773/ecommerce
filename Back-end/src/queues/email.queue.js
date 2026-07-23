import BaseQueue from './base.queue.js';

export class EmailQueue extends BaseQueue {
  constructor(options = {}) {
    super('email', options);
  }
}

export default EmailQueue;

