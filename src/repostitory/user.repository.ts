import { User } from 'src/model/user.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
export interface UserRepository {
  getAllUsers(): Promise<User[]>;
}
