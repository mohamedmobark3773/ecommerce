import { Address } from "./addresses.model.js";

class AddressesRepository {
  async create(userId, addressData) {
    return await Address.create({
      user: userId,
      ...addressData,
    });
  }

  async findByUserId(userId) {
    return await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
  }

  async findById(addressId) {
    return await Address.findById(addressId);
  }

  async findOne(filter) {
    return await Address.findOne(filter);
  }

  async update(addressId, userId, addressData) {
    return await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { $set: addressData },
      { new: true, runValidators: true }
    );
  }

  async delete(addressId, userId) {
    return await Address.findOneAndDelete({ _id: addressId, user: userId });
  }

  async unsetDefaults(userId) {
    return await Address.updateMany(
      { user: userId, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  async setDefault(addressId, userId) {
    await this.unsetDefaults(userId);

    return await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { $set: { isDefault: true } },
      { new: true }
    );
  }
}

export const addressesRepository = new AddressesRepository();
