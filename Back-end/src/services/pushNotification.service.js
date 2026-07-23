export class PushNotificationService {
  async send(payload = {}) {
    return { success: true, message: 'Push notification queued.', payload };
  }
}

export const pushNotificationService = new PushNotificationService();
export default pushNotificationService;

