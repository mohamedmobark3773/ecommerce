export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.isActive = user.isActive;
    this.phone = user.phone;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static transform(user) {
    if (!user) return null;
    if (Array.isArray(user)) {
      return user.map((item) => new UserDTO(item));
    }
    return new UserDTO(user);
  }

  static toDatabase(data) {
    const payload = {};

    if (data.name !== undefined) payload.name = data.name.trim();
    if (data.email !== undefined) payload.email = data.email.trim().toLowerCase();
    if (data.password !== undefined) payload.password = data.password;
    if (data.role !== undefined) payload.role = data.role.trim().toLowerCase();
    if (data.isActive !== undefined) payload.isActive = Boolean(data.isActive);
    if (data.phone !== undefined) payload.phone = data.phone.trim();
    if (data.avatar !== undefined) payload.avatar = data.avatar.trim();

    return payload;
  }
}

