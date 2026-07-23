export class ControllerInterface {
  constructor() {
    if (new.target === ControllerInterface) {
      throw new Error('ControllerInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async create(req, res) {
    throw new Error('ControllerInterface.create() must be implemented.');
  }

  async getAll(req, res) {
    throw new Error('ControllerInterface.getAll() must be implemented.');
  }

  async getById(req, res) {
    throw new Error('ControllerInterface.getById() must be implemented.');
  }

  async update(req, res) {
    throw new Error('ControllerInterface.update() must be implemented.');
  }

  async delete(req, res) {
    throw new Error('ControllerInterface.delete() must be implemented.');
  }
}

export default ControllerInterface;

