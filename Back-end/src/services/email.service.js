export class EmailService {
  async send(payload = {}) {
    return { success: true, message: 'Email queued.', payload };
  }
}

export const emailService = new EmailService();
export default emailService;

