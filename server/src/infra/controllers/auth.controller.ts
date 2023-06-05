import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticateUserService } from '../../domain/services/authenticateUser.service';
import { AuthBodyRequest } from './requests/auth.request';

@Controller('/auth/:username')
export class AuthController {
  constructor(private readonly service: AuthenticateUserService) {}

  @Post()
  authenticate(
    @Body() { secret }: AuthBodyRequest,
    @Param('username') username: string,
  ) {
    return this.service.handleSignIn(username, secret);
  }

  @Get()
  getOne(@Param('username') username: string) {
    return this.service.getSetToSignIn(username);
  }
}
