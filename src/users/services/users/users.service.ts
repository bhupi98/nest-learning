import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Post, User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { Repository, EntityManager } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    const address = this.addressRepository.create(newUser.address);
    const savedAddress = await this.addressRepository.save(address);

    newUser.address = savedAddress; // Assign the saved address to the user's address property

    const posts = this.postRepository.create(newUser.posts);
    const savedposts = await this.addressRepository.save(posts);
    newUser.posts = savedposts; // Assign the created posts to the user's posts property

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }
  findUsersById(id: number) {
    return this.userRepository.findOneById(id);
  }
  getUsers() {
    return this.userRepository.find();
  }
}
