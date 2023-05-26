import { User } from 'src/model/user.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
export interface UserRepository {
  getAllUsers(): Promise<User[]>;

  createUser(userDto: CreateUserDto): Promise<User>;
}
