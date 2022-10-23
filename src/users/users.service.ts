import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    const users = [
      {
        name: 'A',
        age: 12,
      },
    ];
    return new Promise((resolve) => {
      resolve(users);
    });
  }
}
