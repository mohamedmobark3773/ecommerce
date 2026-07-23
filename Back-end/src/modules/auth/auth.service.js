import { authRepository } from "./auth.repository.js";
import { AuthResponseDTO, AuthUserDTO } from "./auth.dto.js";
import { generateToken, verifyToken } from "../../utils/token.js";
import { ApiError } from "../../errors/app.error.js";

class AuthService {
  async register({ fullName, email, password, role }) {
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists.");
    }

    const newUser = await authRepository.create({
      name: fullName,
      email,
      password,
      role: role || "user",
    });

    const accessToken = generateToken({ _id: newUser._id, role: newUser.role }, "access");
    const refreshToken = generateToken({ _id: newUser._id }, "refresh");

    return AuthResponseDTO.transform(newUser, accessToken, refreshToken);
  }

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password.");
    }

    if (user.isActive === false) {
      throw new ApiError(403, "User account is inactive.");
    }

    const accessToken = generateToken({ _id: user._id, role: user.role }, "access");
    const refreshToken = generateToken({ _id: user._id }, "refresh");

    return AuthResponseDTO.transform(user, accessToken, refreshToken);
  }

  async refresh(token) {
    try {
      const decoded = verifyToken(token, "refresh");
      const user = await authRepository.findById(decoded._id);

      if (!user) {
        throw new ApiError(401, "Invalid refresh token.");
      }

      if (user.isActive === false) {
        throw new ApiError(403, "User account is inactive.");
      }

      const accessToken = generateToken({ _id: user._id, role: user.role }, "access");
      const refreshToken = generateToken({ _id: user._id }, "refresh");

      return AuthResponseDTO.transform(user, accessToken, refreshToken);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(401, "Invalid or expired refresh token.");
    }
  }

  async getCurrentUser(userId) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    return AuthUserDTO.transform(user);
  }
}

export const authService = new AuthService();
