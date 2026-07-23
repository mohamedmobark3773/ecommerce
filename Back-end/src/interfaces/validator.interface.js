export class ValidatorInterface {
  constructor() {
    if (new.target === ValidatorInterface) {
      throw new Error('ValidatorInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  validateCreate(payload) {
    throw new Error('ValidatorInterface.validateCreate() must be implemented.');
  }

  validateUpdate(payload) {
    throw new Error('ValidatorInterface.validateUpdate() must be implemented.');
  }

  validateId(id) {
    throw new Error('ValidatorInterface.validateId() must be implemented.');
  }
}

export default ValidatorInterface;

