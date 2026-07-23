export class ProfileDTO {
  constructor(profile) {
    this.id = profile._id || profile.id || null;
    this.user = profile.user || null;
    this.firstName = profile.firstName || '';
    this.lastName = profile.lastName || '';
    this.phone = profile.phone || '';
    this.address = profile.address || '';
    this.createdAt = profile.createdAt || null;
    this.updatedAt = profile.updatedAt || null;
  }

  static transform(profile) {
    if (!profile) return null;
    if (Array.isArray(profile)) {
      return profile.map((item) => new ProfileDTO(item));
    }
    return new ProfileDTO(profile);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      firstName: data.firstName ? data.firstName.trim() : undefined,
      lastName: data.lastName ? data.lastName.trim() : undefined,
      phone: data.phone ? data.phone.trim() : undefined,
      address: data.address ? data.address.trim() : undefined,
    };
  }
}

export default ProfileDTO;

