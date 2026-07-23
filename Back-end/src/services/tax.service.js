export class TaxService {
  async calculate(payload = {}) {
    return { success: true, tax: 0, payload };
  }
}

export const taxService = new TaxService();
export default taxService;

