import BaseRepository from './base.repository.js';

class ApiKeyRepository extends BaseRepository {
  constructor() {
    super('apiKey');
  }
}

export const apiKeyRepository = new ApiKeyRepository();
export default apiKeyRepository;

