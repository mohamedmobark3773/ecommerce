import BaseQueue from './base.queue.js';

export class SmsQueue extends BaseQueue {
  constructor(options = {}) {
    super('sms', options);
  }
}

export default SmsQueue;

