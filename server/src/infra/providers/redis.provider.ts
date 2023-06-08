import { createClient } from 'redis';
import { RedisConstants } from '../../constants/redis.constant';

export class RedisProvider {
  private client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      url: RedisConstants.url,
    });
    this.connect();
  }

  private async connect() {
    await this.client.connect();
  }

  async getRawValue(key: string) {
    return await this.client.get(key);
  }

  async getParsedValue(key: string) {
    return JSON.parse(await this.client.get(key));
  }

  async setValue(key: string, value: string, expires?: number) {
    return await this.client.set(key, value, {
      EX: expires,
    });
  }

  async deleteValue(key: string) {
    return await this.client.del(key);
  }

  async disconnect() {
    await this.client.disconnect();
  }
}
