export class DeliveryService {
  async createShipment(payload = {}) {
    return { success: true, message: 'Shipment created.', payload };
  }
}

export const deliveryService = new DeliveryService();
export default deliveryService;

