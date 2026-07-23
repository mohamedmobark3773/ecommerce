export class StockService {
  async updateStock(payload = {}) {
    return { success: true, message: 'Stock updated.', payload };
  }
}

export const stockService = new StockService();
export default stockService;

