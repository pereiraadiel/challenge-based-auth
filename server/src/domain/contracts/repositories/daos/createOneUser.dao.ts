import { AuthStrategy } from '../../../enums/authStrategy.enum';

export class CreateOneUserDAO {
  username: string;
  authStrategy: AuthStrategy;
  authSet: string[];
}
