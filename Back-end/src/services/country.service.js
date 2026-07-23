import BaseService from './base.service.js';
import { countryRepository } from '../repositories/country.repository.js';

class CountryService extends BaseService {
  constructor() {
    super(countryRepository, 'country');
  }
}

export const countryService = new CountryService();
export default countryService;

