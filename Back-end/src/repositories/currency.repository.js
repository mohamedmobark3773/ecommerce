import BaseRepository from './base.repository.js';

class CurrencyRepository extends BaseRepository {
  constructor() {
    super('currency');
  }
}

export const currencyRepository = new CurrencyRepository();
export default currencyRepository;

