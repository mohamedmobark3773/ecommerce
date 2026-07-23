import { addressesRepository } from "./addresses.repository.js";
import { AddressDTO } from "./addresses.dto.js";

class AddressesService {
  async createAddress(userId, addressData) {
    const formattedData = AddressDTO.toDatabase(addressData);

    const existingAddresses = await addressesRepository.findByUserId(userId);
    if (existingAddresses.length === 0) {
      formattedData.isDefault = true;
    } else if (formattedData.isDefault) {
      await addressesRepository.unsetDefaults(userId);
    }

    const newAddress = await addressesRepository.create(userId, formattedData);
    return AddressDTO.transform(newAddress);
  }

  async getAddressesByUserId(userId) {
    const addresses = await addressesRepository.findByUserId(userId);
    return AddressDTO.transform(addresses);
  }

  async getAddressById(addressId, userId) {
    const address = await addressesRepository.findById(addressId);
    if (!address || address.user.toString() !== userId.toString()) {
      return null;
    }
    return AddressDTO.transform(address);
  }

  async updateAddress(addressId, userId, addressData) {
    const formattedData = AddressDTO.toDatabase(addressData);

    if (formattedData.isDefault) {
      await addressesRepository.unsetDefaults(userId);
    }

    const updatedAddress = await addressesRepository.update(addressId, userId, formattedData);
    return AddressDTO.transform(updatedAddress);
  }

  async deleteAddress(addressId, userId) {
    const deletedAddress = await addressesRepository.delete(addressId, userId);
    if (!deletedAddress) return false;

    if (deletedAddress.isDefault) {
      const remainingAddresses = await addressesRepository.findByUserId(userId);
      if (remainingAddresses.length > 0) {
        await addressesRepository.setDefault(remainingAddresses[0]._id, userId);
      }
    }
    return true;
  }

  async setDefaultAddress(addressId, userId) {
    const address = await addressesRepository.findById(addressId);
    if (!address || address.user.toString() !== userId.toString()) {
      return null;
    }

    const updatedAddress = await addressesRepository.setDefault(addressId, userId);
    return AddressDTO.transform(updatedAddress);
  }
}

export const addressesService = new AddressesService();
