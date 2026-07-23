import { usersRepository } from "./users.repository.js";
import { UserDTO } from "./users.dto.js";

class UsersService {
  async createUser(userData) {
    const formattedData = UserDTO.toDatabase(userData);
    const user = await usersRepository.create(formattedData);
    return UserDTO.transform(user);
  }

  async getUsers(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (query.role) filter.role = query.role;
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true" || query.isActive === true;
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await usersRepository.findAll(filter, options);
    return {
      ...result,
      users: UserDTO.transform(result.users),
    };
  }

  async getUserById(userId) {
    const user = await usersRepository.findById(userId);
    return UserDTO.transform(user);
  }

  async updateUser(userId, userData) {
    const formattedData = UserDTO.toDatabase(userData);
    const user = await usersRepository.update(userId, formattedData);
    return UserDTO.transform(user);
  }

  async deleteUser(userId) {
    const user = await usersRepository.delete(userId);
    return UserDTO.transform(user);
  }
}

export const usersService = new UsersService();

