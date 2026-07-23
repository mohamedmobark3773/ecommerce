export class PaymentGatewayInterface {
  constructor() {
    if (new.target === PaymentGatewayInterface) {
      throw new Error('PaymentGatewayInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async initialize(config) {
    throw new Error('PaymentGatewayInterface.initialize() must be implemented.');
  }

  async charge(paymentData) {
    throw new Error('PaymentGatewayInterface.charge() must be implemented.');
  }

  async refund(refundData) {
    throw new Error('PaymentGatewayInterface.refund() must be implemented.');
  }

  async verifyWebhook(payload, signature) {
    throw new Error('PaymentGatewayInterface.verifyWebhook() must be implemented.');
  }
}

export default PaymentGatewayInterface;

