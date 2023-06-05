import { AuthStrategies } from '../../../domain/enums/authStrategy.enum';
import { AuthStrategy } from './../../../domain/enums/authStrategy.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBodyRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(AuthStrategies)
  authStrategy: AuthStrategy;
}
