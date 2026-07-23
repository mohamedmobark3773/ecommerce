import BaseQueue from './base.queue.js';

export class RefundQueue extends BaseQueue {
  constructor(options = {}) {
    super('refund', options);
  }
}

export default RefundQueue;

