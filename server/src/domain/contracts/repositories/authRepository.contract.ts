export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepositoryContract {
  register(username: string, oneTimeId: string): Promise<void>;
  get(oneTimeId: string): Promise<string>;
}
