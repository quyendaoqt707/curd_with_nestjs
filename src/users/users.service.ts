import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }

  getUser(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  getUsers() {
    // const users = [
    //   {
    //     name: 'A',
    //     age: 12,
    //   },
    // ];
    return this.usersRepository.find();
    // return new Promise((resolve) => {
    //   resolve(users);
    // });
  }

  createUser(user) {
    // const user= this.usersRepository.findOneBy({ user.id }).catch;
    return this.usersRepository.insert(user);
    // return this.usersRepository.create(user);
  }

  updateUser(user) {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    console.log(id);
    await this.usersRepository.delete(id);
  }
}
