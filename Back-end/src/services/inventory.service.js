import BaseService from './base.service.js';
import { inventoryRepository } from '../repositories/inventory.repository.js';

class InventoryService extends BaseService {
  constructor() {
    super(inventoryRepository, 'inventory');
  }
}

export const inventoryService = new InventoryService();
export default inventoryService;

