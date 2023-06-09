import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserController } from 'src/controller/user/user.controller';
import { User } from 'src/model/user.entity';
import { UserRepository } from 'src/repostitory/user.repository';
import { UserService } from 'src/service/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
