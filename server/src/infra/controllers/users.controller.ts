import { Public } from './../decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { CreateUserBodyRequest } from './requests/createUser.request';
import { UpdateUserBodyRequest } from './requests/updateUser.request';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { FastifyRequest } from 'fastify';

@UseInterceptors(AuthInterceptor)
@Controller('/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @Public()
  createOne(@Body() { username, authStrategy }: CreateUserBodyRequest) {
    return this.service.createOne(username, authStrategy);
  }

  @Get('/:username')
  getOne(@Req() { token }: FastifyRequest) {
    return this.service.findOne(token);
  }

  @Put('/:username')
  updateOne(
    @Body() { authStrategy }: UpdateUserBodyRequest,
    @Req() { token }: FastifyRequest,
  ) {
    return this.service.updateOne(token, authStrategy);
  }
}
