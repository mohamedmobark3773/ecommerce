import { BaseJob } from './base.job.js';

export class GenerateInvoiceJob extends BaseJob {
  constructor() {
    super('generate-invoice');
  }

  async run(payload = {}) {
    return { success: true, message: 'Invoice generated.', payload };
  }
}

export default GenerateInvoiceJob;

