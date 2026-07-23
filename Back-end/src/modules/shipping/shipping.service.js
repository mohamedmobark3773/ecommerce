import { shippingRepository } from "./shipping.repository.js";
import { ShippingDTO } from "./shipping.dto.js";

class ShippingService {
  async createShipping(shippingData) {
    const formattedData = ShippingDTO.toDatabase(shippingData);
    const shipping = await shippingRepository.create(formattedData);
    return ShippingDTO.transform(shipping);
  }

  async getShippingMethods(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true" || query.isActive === true;
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await shippingRepository.findAll(filter, options);
    return {
      ...result,
      shippingMethods: ShippingDTO.transform(result.shippingMethods),
    };
  }

  async getShippingById(shippingId) {
    const shipping = await shippingRepository.findById(shippingId);
    return ShippingDTO.transform(shipping);
  }

  async updateShipping(shippingId, shippingData) {
    const formattedData = ShippingDTO.toDatabase(shippingData);
    const shipping = await shippingRepository.update(shippingId, formattedData);
    return ShippingDTO.transform(shipping);
  }

  async deleteShipping(shippingId) {
    const shipping = await shippingRepository.delete(shippingId);
    return ShippingDTO.transform(shipping);
  }
}

export const shippingService = new ShippingService();

