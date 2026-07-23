import BaseQueue from './base.queue.js';

export class WebhookQueue extends BaseQueue {
  constructor(options = {}) {
    super('webhook', options);
  }
}

export default WebhookQueue;

