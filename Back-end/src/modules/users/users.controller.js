import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { usersService } from "./users.service.js";

export const createUser = asyncHandler(async (req, res) => {
  const user = await usersService.createUser(req.body);

  return res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: user,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const result = await usersService.getUsers(req.query);

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully.",
    data: result,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully.",
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.updateUser(userId, req.body);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.deleteUser(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
    data: user,
  });
});

