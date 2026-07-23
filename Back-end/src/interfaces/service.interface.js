export class ServiceInterface {
  constructor() {
    if (new.target === ServiceInterface) {
      throw new Error('ServiceInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async create(data) {
    throw new Error('ServiceInterface.create() must be implemented.');
  }

  async getAll(query = {}) {
    throw new Error('ServiceInterface.getAll() must be implemented.');
  }

  async getById(id) {
    throw new Error('ServiceInterface.getById() must be implemented.');
  }

  async update(id, data) {
    throw new Error('ServiceInterface.update() must be implemented.');
  }

  async delete(id) {
    throw new Error('ServiceInterface.delete() must be implemented.');
  }
}

export default ServiceInterface;

