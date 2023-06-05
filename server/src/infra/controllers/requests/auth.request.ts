import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBodyRequest {
  @IsNotEmpty()
  @IsString()
  secret: string;
}
