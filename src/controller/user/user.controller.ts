import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/service/user/user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
