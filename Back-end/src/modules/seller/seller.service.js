import { sellersRepository } from "./seller.repository.js";
import { SellerDTO } from "./seller.dto.js";

class SellersService {
  async createSeller(sellerData) {
    const formattedData = SellerDTO.toDatabase(sellerData);
    const seller = await sellersRepository.create(formattedData);
    return SellerDTO.transform(seller);
  }

  async getSellers(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [
        { shopName: { $regex: search, $options: "i" } },
        { shopSlug: { $regex: search, $options: "i" } },
      ];
    }

    if (query.status) filter.status = query.status;
    if (query.isVerified !== undefined) {
      filter.isVerified = query.isVerified === "true" || query.isVerified === true;
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await sellersRepository.findAll(filter, options);
    return {
      ...result,
      sellers: SellerDTO.transform(result.sellers),
    };
  }

  async getSellerById(sellerId) {
    const seller = await sellersRepository.findById(sellerId);
    return SellerDTO.transform(seller);
  }

  async updateSeller(sellerId, sellerData) {
    const formattedData = SellerDTO.toDatabase(sellerData);
    const seller = await sellersRepository.update(sellerId, formattedData);
    return SellerDTO.transform(seller);
  }

  async deleteSeller(sellerId) {
    const seller = await sellersRepository.delete(sellerId);
    return SellerDTO.transform(seller);
  }
}

export const sellersService = new SellersService();

