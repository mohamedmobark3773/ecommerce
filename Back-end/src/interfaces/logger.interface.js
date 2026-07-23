export class LoggerInterface {
  constructor() {
    if (new.target === LoggerInterface) {
      throw new Error('LoggerInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  info(message, meta) {
    throw new Error('LoggerInterface.info() must be implemented.');
  }

  warn(message, meta) {
    throw new Error('LoggerInterface.warn() must be implemented.');
  }

  error(message, meta) {
    throw new Error('LoggerInterface.error() must be implemented.');
  }

  debug(message, meta) {
    throw new Error('LoggerInterface.debug() must be implemented.');
  }

  http(method, url, meta) {
    throw new Error('LoggerInterface.http() must be implemented.');
  }

  db(operation, model, meta) {
    throw new Error('LoggerInterface.db() must be implemented.');
  }
}

export default LoggerInterface;

