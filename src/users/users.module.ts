import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/typeorm';
import { Post } from 'src/typeorm/post.entity';
import { User } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Post])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
