import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return await this.usersService.createUser(request);
  }
}
