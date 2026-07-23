import BaseRepository from './base.repository.js';

class WarehouseRepository extends BaseRepository {
  constructor() {
    super('warehouse');
  }
}

export const warehouseRepository = new WarehouseRepository();
export default warehouseRepository;

