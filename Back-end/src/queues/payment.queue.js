import BaseQueue from './base.queue.js';

export class PaymentQueue extends BaseQueue {
  constructor(options = {}) {
    super('payment', options);
  }
}

export default PaymentQueue;

