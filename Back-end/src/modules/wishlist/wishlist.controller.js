import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { wishlistService } from "./wishlist.service.js";

export const addToWishlist = asyncHandler(async (req, res) => {
  const item = await wishlistService.addToWishlist(req.body);

  return res.status(201).json({
    success: true,
    message: "Item added to wishlist successfully.",
    data: item,
  });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const result = await wishlistService.getWishlist(req.query);

  return res.status(200).json({
    success: true,
    message: "Wishlist retrieved successfully.",
    data: result,
  });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const item = await wishlistService.removeFromWishlist(userId, productId);

  if (!item) {
    throw new ApiError(404, "Wishlist item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Wishlist item removed successfully.",
    data: item,
  });
});

