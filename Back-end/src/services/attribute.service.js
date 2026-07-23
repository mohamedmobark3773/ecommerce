import { attributeRepository } from '../repositories/attribute.repository.js';
import { AttributeDTO } from '../dto/attribute.dto.js';
import { ApiError } from '../errors/app.error.js';
import { Product } from '../modules/products/products.model.js';
import { Attribute } from '../models/attribute.model.js';

class AttributeService {
  async createAttribute(attributeData) {
    const formattedData = AttributeDTO.toDatabase(attributeData);
    const attribute = await attributeRepository.create(formattedData);
    return AttributeDTO.transform(attribute);
  }

  async getAttributes(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [{ name: { $regex: search, $options: 'i' } }];
    }

    if (query.status) filter.status = query.status;

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await attributeRepository.findAll(filter, options);
    return {
      ...result,
      attributes: AttributeDTO.transform(result.attributes),
    };
  }

  async getAttributeById(attributeId) {
    const attribute = await attributeRepository.findById(attributeId);
    return AttributeDTO.transform(attribute);
  }

  async addAttributeToProduct(productId, attributeId, value) {
    const product = await Product.findById(productId);
    const attribute = await Attribute.findById(attributeId);

    if (!product) {
      throw new ApiError(404, 'Product not found.');
    }

    if (!attribute) {
      throw new ApiError(404, 'Attribute not found.');
    }

    product.attributes = product.attributes || [];
    product.attributes.push({ attributeId, value });
    await product.save();

    return product;
  }

  async updateAttribute(attributeId, attributeData) {
    const formattedData = AttributeDTO.toDatabase(attributeData);
    const attribute = await attributeRepository.update(attributeId, formattedData);
    return AttributeDTO.transform(attribute);
  }

  async deleteAttribute(attributeId) {
    const attribute = await attributeRepository.delete(attributeId);
    return AttributeDTO.transform(attribute);
  }
}

export const attributeService = new AttributeService();

