import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticateUserService } from '../../domain/services/authenticateUser.service';
import { AuthBodyRequest } from './requests/auth.request';
import { Public } from '../decorators/public.decorator';

@Controller('/auth/:username')
@Public()
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
