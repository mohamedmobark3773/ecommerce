export class AddressDTO {
  constructor(address) {
    this.id = address._id;
    this.user = address.user;
    this.fullName = address.fullName;
    this.phone = address.phone;
    this.country = address.country;
    this.state = address.state;
    this.city = address.city;
    this.street = address.street;
    this.postalCode = address.postalCode;
    this.addressType = address.addressType;
    this.isDefault = address.isDefault;
    this.latitude = address.latitude;
    this.longitude = address.longitude;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }

  static transform(address) {
    if (!address) return null;
    if (Array.isArray(address)) {
      return address.map((item) => new AddressDTO(item));
    }
    return new AddressDTO(address);
  }

  static toDatabase(data) {
    return {
      fullName: data.fullName ? data.fullName.trim() : undefined,
      phone: data.phone ? data.phone.trim() : undefined,
      country: data.country ? data.country.trim() : undefined,
      state: data.state ? data.state.trim() : undefined,
      city: data.city ? data.city.trim() : undefined,
      street: data.street ? data.street.trim() : undefined,
      postalCode: data.postalCode ? data.postalCode.trim() : undefined,
      addressType: data.addressType || "home",
      isDefault: data.isDefault !== undefined ? !!data.isDefault : false,
      latitude: data.latitude !== undefined ? Number(data.latitude) : undefined,
      longitude: data.longitude !== undefined ? Number(data.longitude) : undefined,
    };
  }
}
