import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { authService } from "./auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const result = await authService.register({
    fullName,
    email,
    password,
    role,
  });

  return res.status(201).json({
    success: true,
    message: "Registration successful.",
    data: result,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await authService.refresh(refreshToken);

  return res.status(200).json({
    success: true,
    message: "Tokens refreshed successfully.",
    data: result,
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await authService.getCurrentUser(userId);

  return res.status(200).json({
    success: true,
    message: "Current user retrieved successfully.",
    data: user,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
});
