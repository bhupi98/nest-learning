import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/service/user/user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }
}
