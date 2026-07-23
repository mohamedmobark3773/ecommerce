export class InventoryDTO {
  constructor(inventory) {
    this.id = inventory._id || inventory.id || null;
    this.product = inventory.product || null;
    this.sku = inventory.sku || '';
    this.stock = inventory.stock || 0;
    this.reserved = inventory.reserved || 0;
    this.createdAt = inventory.createdAt || null;
    this.updatedAt = inventory.updatedAt || null;
  }

  static transform(inventory) {
    if (!inventory) return null;
    if (Array.isArray(inventory)) {
      return inventory.map((item) => new InventoryDTO(item));
    }
    return new InventoryDTO(inventory);
  }

  static toDatabase(data = {}) {
    return {
      product: data.product || undefined,
      sku: data.sku ? data.sku.trim() : undefined,
      stock: typeof data.stock === 'number' ? data.stock : undefined,
      reserved: typeof data.reserved === 'number' ? data.reserved : undefined,
    };
  }
}

export default InventoryDTO;

