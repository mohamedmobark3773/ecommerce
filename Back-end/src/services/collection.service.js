import BaseService from './base.service.js';
import { collectionRepository } from '../repositories/collection.repository.js';

class CollectionService extends BaseService {
  constructor() {
    super(collectionRepository, 'collection');
  }
}

export const collectionService = new CollectionService();
export default collectionService;

