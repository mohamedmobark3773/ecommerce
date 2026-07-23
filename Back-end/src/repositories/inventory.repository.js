import BaseRepository from './base.repository.js';

class InventoryRepository extends BaseRepository {
  constructor() {
    super('inventory');
  }
}

export const inventoryRepository = new InventoryRepository();
export default inventoryRepository;

