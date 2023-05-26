import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user/user.controller';
import { User } from 'src/model/user.entity';
import { UserRepository } from 'src/repostitory/user.repository';
import { UserService } from 'src/service/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
