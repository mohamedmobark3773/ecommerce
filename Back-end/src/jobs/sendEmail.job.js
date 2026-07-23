import { BaseJob } from './base.job.js';

export class SendEmailJob extends BaseJob {
  constructor() {
    super('send-email');
  }

  async run(payload = {}) {
    return { success: true, message: 'Email send job completed.', payload };
  }
}

export default SendEmailJob;

