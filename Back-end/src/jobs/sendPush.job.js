import { BaseJob } from './base.job.js';

export class SendPushJob extends BaseJob {
  constructor() {
    super('send-push');
  }

  async run(payload = {}) {
    return { success: true, message: 'Push notification sent.', payload };
  }
}

export default SendPushJob;

