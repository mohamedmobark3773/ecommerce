import { Cart } from "./cart.model.js";

class CartRepository {
  async findByUserId(userId) {
    return await Cart.findOne({ user: userId }).populate("items.product").populate("items.variant");
  }

  async create(userId, cartData) {
    return await Cart.create({ user: userId, ...cartData });
  }

  async save(cart) {
    return await cart.save();
  }

  async updateByUserId(userId, updateData) {
    return await Cart.findOneAndUpdate({ user: userId }, { $set: updateData }, { new: true, runValidators: true });
  }

  async deleteByUserId(userId) {
    return await Cart.findOneAndDelete({ user: userId });
  }
}

export const cartRepository = new CartRepository();

