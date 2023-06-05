import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { CreateUserBodyRequest } from './requests/createUser.request';
import { UpdateUserBodyRequest } from './requests/updateUser.request';

@Controller('/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  createOne(@Body() { username, authStrategy }: CreateUserBodyRequest) {
    return this.service.createOne(username, authStrategy);
  }

  @Get('/:username')
  getOne(@Param('username') username: string) {
    return this.service.findOne(username);
  }

  @Put('/:username')
  updateOne(
    @Body() { authStrategy }: UpdateUserBodyRequest,
    @Param('username') username: string,
  ) {
    return this.service.updateOne(username, authStrategy);
  }
}
