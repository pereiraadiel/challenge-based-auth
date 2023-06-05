import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  AuthStrategies,
  AuthStrategy,
} from '../../../domain/enums/authStrategy.enum';

export class UpdateUserBodyRequest {
  @IsNotEmpty()
  @IsEnum(AuthStrategies)
  authStrategy: AuthStrategy;
}
