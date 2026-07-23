import BaseService from './base.service.js';
import { warehouseRepository } from '../repositories/warehouse.repository.js';

class WarehouseService extends BaseService {
  constructor() {
    super(warehouseRepository, 'warehouse');
  }
}

export const warehouseService = new WarehouseService();
export default warehouseService;

