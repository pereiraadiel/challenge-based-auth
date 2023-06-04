import { AuthStrategy } from '../../../enums/authStrategy.enum';

export class UpdateOneUserDAO {
  username: string;
  authStrategy: AuthStrategy;
  authSet: string[];
}
