import { BaseJob } from './base.job.js';

export class ProcessPaymentJob extends BaseJob {
  constructor() {
    super('process-payment');
  }

  async run(payload = {}) {
    return { success: true, message: 'Payment processed.', payload };
  }
}

export default ProcessPaymentJob;

