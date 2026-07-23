import { cartRepository } from "./cart.repository.js";
import { CartDTO } from "./cart.dto.js";

class CartService {
  async getCart(userId) {
    const cart = await cartRepository.findByUserId(userId);
    return CartDTO.transform(cart);
  }

  async addItemToCart(userId, itemData) {
    const cart = await cartRepository.findByUserId(userId);
    const normalizedItem = {
      product: itemData.product,
      variant: itemData.variant || null,
      quantity: itemData.quantity || 1,
      price: itemData.price || 0,
      currency: itemData.currency || "USD",
      subtotal: itemData.subtotal || (itemData.price || 0) * (itemData.quantity || 1),
    };

    if (!cart) {
      const createdCart = await cartRepository.create(userId, {
        items: [normalizedItem],
        subtotal: normalizedItem.subtotal,
        total: normalizedItem.subtotal,
        currency: normalizedItem.currency,
      });
      return CartDTO.transform(createdCart);
    }

    const existingItem = cart.items.find((entry) => entry.product?.toString() === normalizedItem.product && entry.variant?.toString() === (normalizedItem.variant || null));

    if (existingItem) {
      existingItem.quantity += normalizedItem.quantity;
      existingItem.price = normalizedItem.price || existingItem.price;
      existingItem.currency = normalizedItem.currency || existingItem.currency;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      cart.items.push(normalizedItem);
    }

    cart.subtotal = cart.items.reduce((sum, entry) => sum + (entry.subtotal || 0), 0);
    cart.total = cart.subtotal;
    cart.currency = cart.items[0]?.currency || "USD";

    const savedCart = await cartRepository.save(cart);
    return CartDTO.transform(savedCart);
  }

  async updateCartItem(userId, cartItemId, itemData) {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) return null;

    const item = cart.items.id(cartItemId);
    if (!item) return null;

    if (itemData.quantity !== undefined) {
      item.quantity = itemData.quantity;
    }
    if (itemData.price !== undefined) {
      item.price = itemData.price;
    }
    if (itemData.subtotal !== undefined) {
      item.subtotal = itemData.subtotal;
    }

    if (itemData.quantity !== undefined || itemData.price !== undefined) {
      item.subtotal = item.quantity * item.price;
    }

    cart.subtotal = cart.items.reduce((sum, entry) => sum + (entry.subtotal || 0), 0);
    cart.total = cart.subtotal;

    const savedCart = await cartRepository.save(cart);
    return CartDTO.transform(savedCart);
  }

  async removeCartItem(userId, cartItemId) {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) return null;

    const item = cart.items.id(cartItemId);
    if (!item) return null;

    cart.items.pull(cartItemId);
    cart.subtotal = cart.items.reduce((sum, entry) => sum + (entry.subtotal || 0), 0);
    cart.total = cart.subtotal;

    const savedCart = await cartRepository.save(cart);
    return CartDTO.transform(savedCart);
  }

  async clearCart(userId) {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) return null;

    cart.items = [];
    cart.subtotal = 0;
    cart.total = 0;
    cart.itemsCount = 0;
    cart.totalItems = 0;

    const savedCart = await cartRepository.save(cart);
    return CartDTO.transform(savedCart);
  }
}

export const cartService = new CartService();

