import { createClient } from 'redis';

export class RedisProvider {
  private client = createClient();

  constructor() {
    this.client = createClient();
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
}
