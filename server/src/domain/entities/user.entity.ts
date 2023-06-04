import { AuthStrategy } from './../enums/authStrategy.enum';
import { Entity } from './entity';

export class UserEntity extends Entity {
  username: string;
  authStrategy: AuthStrategy;
  authSet: string[];

  constructor(entity: Omit<UserEntity, 'createdAt' | 'id'>, id?: string) {
    super(entity, id);
    Object.assign(this, entity);
  }
}
