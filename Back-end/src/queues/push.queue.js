import BaseQueue from './base.queue.js';

export class PushQueue extends BaseQueue {
  constructor(options = {}) {
    super('push', options);
  }
}

export default PushQueue;

