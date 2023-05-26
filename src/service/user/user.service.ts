import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repostitory/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
@Injectable()
export class UserService implements UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      let user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {}
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
