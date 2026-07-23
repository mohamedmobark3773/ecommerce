import BaseQueue from './base.queue.js';

export class InvoiceQueue extends BaseQueue {
  constructor(options = {}) {
    super('invoice', options);
  }
}

export default InvoiceQueue;

