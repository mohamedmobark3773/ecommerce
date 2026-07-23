export class DiscountService {
  async calculate(payload = {}) {
    return { success: true, discount: 0, payload };
  }
}

export const discountService = new DiscountService();
export default discountService;

