//src/constants/auth.constants.js
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  SELLER: "seller",
};

export const JWT = {
  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "7d",
};

export const COOKIES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful.",
  REGISTER_SUCCESS: "Account created successfully.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  UNAUTHORIZED: "Unauthorized.",
  FORBIDDEN: "Access denied.",
};