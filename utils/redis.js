import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    this.client.connect()
      .then(() => {
        // connection successful
      })
      .catch((err) => {
        console.error('Redis Connection Error:', err);
      });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Redis GET Error for key "${key}":`, err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration,
      });
    } catch (err) {
      console.error(`Redis SET Error for key "${key}":`, err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Redis DEL Error for key "${key}":`, err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
export { RedisClient };
