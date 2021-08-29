import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import config from '../../../app.config';

const { redisUrl, redisPort } = config;

interface KVClient {
  aGet(key: string): Promise<object>;
  aSet(key: string, value: string): Promise<void>;
}

class RedisInterface implements KVClient {
  client: RedisClient = redis.createClient(`redis://${redisUrl}:${redisPort}`);

  constructor() {}

  async aGet(key: string) {
    const result = await promisify(this.client.get)
      .bind(this.client)(key)
      .then((res: string | null) => {
        if (res) return JSON.parse(res);
        else return {};
      })
      .catch((err: string) => console.error(err));
    return result;
  }

  async aSet(key: string, value: string) {
    await promisify(this.client.set)
      .bind(this.client)(key, value)
      .then((res) => console.log(res))
      .catch((err: string) => console.error(err));
  }
}

const redisClient = new RedisInterface();

export { redisClient };
