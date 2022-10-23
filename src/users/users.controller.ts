import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('all') // localhost:3000/users/all
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':userId') //Catch userId trong url
  async getUser(@Param('userId') id) {
    return {
      name: 'B',
      age: id,
    };
  }
}
