export class CacheService {
  constructor() {
    this.store = new Map();
  }

  async get(key) {
    return this.store.get(key) ?? null;
  }

  async set(key, value, ttl = 0) {
    this.store.set(key, value);
    return value;
  }

  async delete(key) {
    return this.store.delete(key);
  }
}

export const cacheService = new CacheService();
export default cacheService;

