export class AuthUserDTO {
  constructor(user) {
    this.id = user._id;
    this.fullName = user.name || user.fullName || "";
    this.email = user.email;
    this.role = user.role;
    this.status = user.status || (user.isActive === false ? "inactive" : "active");
    this.isEmailVerified = user.isEmailVerified;
    this.phone = user.phone;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
  }

  static transform(user) {
    if (!user) return null;
    return new AuthUserDTO(user);
  }
}

export class AuthResponseDTO {
  static transform(user, accessToken, refreshToken) {
    return {
      user: AuthUserDTO.transform(user),
      accessToken,
      refreshToken,
    };
  }
}
