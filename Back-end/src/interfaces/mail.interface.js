export class MailInterface {
  constructor() {
    if (new.target === MailInterface) {
      throw new Error('MailInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async sendMail(options) {
    throw new Error('MailInterface.sendMail() must be implemented.');
  }

  async sendTemplateMail(template, data, to) {
    throw new Error('MailInterface.sendTemplateMail() must be implemented.');
  }

  async sendOtp(email, otp) {
    throw new Error('MailInterface.sendOtp() must be implemented.');
  }
}

export default MailInterface;

