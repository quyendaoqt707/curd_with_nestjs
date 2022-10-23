import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users') //pre
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all') // localhost:3000/users/all
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':userId') // userId trong url // localhost:3000/users/1
  async getUser(@Param('userId') id) {
    return await this.usersService.getUser(id);
  }

  @Post('createUser') //localhost:3000/users/createUser
  async createUser(@Body() user: User) {
    console.log(user);
    const result = await this.usersService.createUser(user).catch((err) => {
      console.log(err);
      return err;
    });

    // InsertResult {
    //   identifiers: [ { id: 6 } ],
    //   generatedMaps: [ { id: 6 } ],
    //   raw: ResultSetHeader {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 6,
    //     info: '',
    //     serverStatus: 2,
    //     warningStatus: 0
    //   }
    // }
    if (result.raw ? result.raw.affectedRows > 0 : false) return 'success';
    else return 'failed';
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id) {
    await this.usersService.remove(id).catch((err) => {
      console.log(err);
      return 'failed';
    });
    return 'success';
  }

  @Post('updateUser')
  async updateUser(@Body() user: User) {
    await this.usersService.updateUser(user).catch((err) => {
      console.log(err);
      return 'failed';
    });
  }
}
