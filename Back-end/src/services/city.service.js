import BaseService from './base.service.js';
import { cityRepository } from '../repositories/city.repository.js';

class CityService extends BaseService {
  constructor() {
    super(cityRepository, 'city');
  }
}

export const cityService = new CityService();
export default cityService;

