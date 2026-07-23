export class CacheInterface {
  constructor() {
    if (new.target === CacheInterface) {
      throw new Error('CacheInterface is an abstract contract and cannot be instantiated directly.');
    }
  }

  async get(key) {
    throw new Error('CacheInterface.get() must be implemented.');
  }

  async set(key, value, ttl = 60) {
    throw new Error('CacheInterface.set() must be implemented.');
  }

  async del(key) {
    throw new Error('CacheInterface.del() must be implemented.');
  }

  async clear() {
    throw new Error('CacheInterface.clear() must be implemented.');
  }

  async has(key) {
    throw new Error('CacheInterface.has() must be implemented.');
  }
}

export default CacheInterface;

