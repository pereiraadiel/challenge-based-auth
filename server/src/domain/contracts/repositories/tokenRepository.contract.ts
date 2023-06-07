export const TOKEN_REPOSITORY = 'TOKEN_REPOSITORY';

export interface TokenRepositoryContract {
  register(token: string): Promise<void>;
  get(token: string): Promise<string>;
}
