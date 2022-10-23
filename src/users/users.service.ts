import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

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
