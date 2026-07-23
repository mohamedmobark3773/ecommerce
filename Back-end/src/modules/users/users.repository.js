import { User } from "./users.model.js";

class UsersRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter).select("-password").sort(sort).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(userId) {
    return await User.findById(userId).select("-password");
  }

  async update(userId, userData) {
    const user = await User.findById(userId);
    if (!user) return null;

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== undefined && key !== "_id") {
        user[key] = userData[key];
      }
    });

    await user.save();
    return await User.findById(userId).select("-password");
  }

  async delete(userId) {
    return await User.findByIdAndDelete(userId).select("-password");
  }
}

export const usersRepository = new UsersRepository();

