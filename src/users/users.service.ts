import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async createUser(user: User) {
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User) {
    return await this.usersRepository.update(user.id, user);
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        // Handle the case where the user is not found
        // For example, throw a custom error or return null
        console.log('User not found!');
      }
      return user;
    } catch (error) {
      // Handle any other errors that might occur
      // For example, log the error and throw a custom error
      console.log('GET USER ERROR:', error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        // Handle the case where the user is not found
        // For example, throw a custom error or return null
        console.log('User not found!');
      }
      return user;
    } catch (error) {
      // Handle any other errors that might occur
      // For example, log the error and throw a custom error
      console.log('GET USER ERROR:', error);
    }
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
