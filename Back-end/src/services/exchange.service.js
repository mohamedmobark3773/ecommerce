export class ExchangeService {
  async convert(amount, fromCurrency, toCurrency) {
    return { success: true, amount, fromCurrency, toCurrency };
  }
}

export const exchangeService = new ExchangeService();
export default exchangeService;

