import { BaseJob } from './base.job.js';

export class ProcessRefundJob extends BaseJob {
  constructor() {
    super('process-refund');
  }

  async run(payload = {}) {
    return { success: true, message: 'Refund processed.', payload };
  }
}

export default ProcessRefundJob;

