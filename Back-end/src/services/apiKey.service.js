import BaseService from './base.service.js';
import { apiKeyRepository } from '../repositories/apiKey.repository.js';

class ApiKeyService extends BaseService {
  constructor() {
    super(apiKeyRepository, 'api key');
  }
}

export const apiKeyService = new ApiKeyService();
export default apiKeyService;

