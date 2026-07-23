export class RepositoryInterface {
  constructor() {
    if (new.target === RepositoryInterface) {
      throw new Error('RepositoryInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async create(data) {
    throw new Error('RepositoryInterface.create() must be implemented.');
  }

  async getById(id) {
    throw new Error('RepositoryInterface.getById() must be implemented.');
  }

  async getAll(filter = {}) {
    throw new Error('RepositoryInterface.getAll() must be implemented.');
  }

  async update(id, data) {
    throw new Error('RepositoryInterface.update() must be implemented.');
  }

  async delete(id) {
    throw new Error('RepositoryInterface.delete() must be implemented.');
  }
}

export default RepositoryInterface;

