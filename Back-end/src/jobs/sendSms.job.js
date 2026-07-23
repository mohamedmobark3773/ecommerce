import { BaseJob } from './base.job.js';

export class SendSmsJob extends BaseJob {
  constructor() {
    super('send-sms');
  }

  async run(payload = {}) {
    return { success: true, message: 'SMS sent.', payload };
  }
}

export default SendSmsJob;

