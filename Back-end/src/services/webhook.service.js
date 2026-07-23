export class WebhookService {
  async trigger(payload = {}) {
    return { success: true, message: 'Webhook triggered.', payload };
  }
}

export const webhookService = new WebhookService();
export default webhookService;

