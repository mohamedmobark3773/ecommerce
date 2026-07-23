import BaseService from './base.service.js';
import { variantRepository } from '../repositories/variant.repository.js';

class VariantService extends BaseService {
  constructor() {
    super(variantRepository, 'variant');
  }
}

export const variantService = new VariantService();
export default variantService;

