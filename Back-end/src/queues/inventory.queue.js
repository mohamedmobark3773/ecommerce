import BaseQueue from './base.queue.js';

export class InventoryQueue extends BaseQueue {
  constructor(options = {}) {
    super('inventory', options);
  }
}

export default InventoryQueue;

