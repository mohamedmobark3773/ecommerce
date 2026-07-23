import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import * as cartServiceModule from "./cart.service.js";

const cartService = cartServiceModule.cartService ?? cartServiceModule.default ?? cartServiceModule;

const getCartService = () => {
  if (!cartService || typeof cartService.addItemToCart !== "function") {
    throw new ApiError(500, "Cart service is not available.");
  }

  return cartService;
};

const getUserId = (req) => req.user?._id ?? req.user?.id;

export const addItemToCart = asyncHandler(async (req, res) => {
  const service = getCartService();
  const userId = getUserId(req);
  const cart = await service.addItemToCart(userId, req.body);

  return res.status(200).json({
    success: true,
    message: "Item added to cart successfully.",
    data: cart,
  });
});

export const getCart = asyncHandler(async (req, res) => {
  const service = getCartService();
  const userId = getUserId(req);
  const cart = await service.getCart(userId);

  return res.status(200).json({
    success: true,
    message: "Cart retrieved successfully.",
    data: cart,
  });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const service = getCartService();
  const userId = getUserId(req);
  const { cartItemId } = req.params;
  const cart = await service.updateCartItem(userId, cartItemId, req.body);

  if (!cart) {
    throw new ApiError(404, "Cart item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Cart item updated successfully.",
    data: cart,
  });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const service = getCartService();
  const userId = getUserId(req);
  const { cartItemId } = req.params;
  const cart = await service.removeCartItem(userId, cartItemId);

  if (!cart) {
    throw new ApiError(404, "Cart item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Cart item removed successfully.",
    data: cart,
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const service = getCartService();
  const userId = getUserId(req);
  const cart = await service.clearCart(userId);

  return res.status(200).json({
    success: true,
    message: "Cart cleared successfully.",
    data: cart,
  });
});

