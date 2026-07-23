// Back-end/src/modules/auth/auth.repository.js

import { User } from "./auth.model.js";

class AuthRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async update(userId, updateData) {
    return await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true });
  }
}

export const authRepository = new AuthRepository();
