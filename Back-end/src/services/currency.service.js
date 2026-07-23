import BaseService from './base.service.js';
import { currencyRepository } from '../repositories/currency.repository.js';

class CurrencyService extends BaseService {
  constructor() {
    super(currencyRepository, 'currency');
  }
}

export const currencyService = new CurrencyService();
export default currencyService;

