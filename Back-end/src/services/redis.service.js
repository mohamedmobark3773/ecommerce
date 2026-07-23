export class RedisService {
  async get(key) {
    return null;
  }

  async set(key, value) {
    return { success: true, key, value };
  }
}

export const redisService = new RedisService();
export default redisService;

