import BaseQueue from './base.queue.js';

export class ReportQueue extends BaseQueue {
  constructor(options = {}) {
    super('report', options);
  }
}

export default ReportQueue;

