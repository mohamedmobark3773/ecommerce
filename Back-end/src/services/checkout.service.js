export class CheckoutService {
  async initiate(payload = {}) {
    return { success: true, message: 'Checkout initiated.', payload };
  }

  async confirm(payload = {}) {
    return { success: true, message: 'Checkout confirmed.', payload };
  }
}

export const checkoutService = new CheckoutService();
export default checkoutService;

