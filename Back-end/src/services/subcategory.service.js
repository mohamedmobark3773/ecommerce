import BaseService from './base.service.js';
import { subcategoryRepository } from '../repositories/subcategory.repository.js';

class SubcategoryService extends BaseService {
  constructor() {
    super(subcategoryRepository, 'subcategory');
  }
}

export const subcategoryService = new SubcategoryService();
export default subcategoryService;

