export class SmsService {
  async send(payload = {}) {
    return { success: true, message: 'SMS queued.', payload };
  }
}

export const smsService = new SmsService();
export default smsService;

