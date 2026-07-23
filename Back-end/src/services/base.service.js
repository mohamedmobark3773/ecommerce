export class BaseService {
  constructor(repository, resourceName = 'resource') {
    this.repository = repository;
    this.resourceName = resourceName;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getAll(query = {}) {
    return this.repository.findAll({}, query);
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

export default BaseService;

