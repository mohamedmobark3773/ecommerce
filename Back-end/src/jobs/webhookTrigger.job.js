import { BaseJob } from './base.job.js';

export class WebhookTriggerJob extends BaseJob {
  constructor() {
    super('webhook-trigger');
  }

  async run(payload = {}) {
    return { success: true, message: 'Webhook triggered.', payload };
  }
}

export default WebhookTriggerJob;

