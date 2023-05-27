import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './jwt-service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const token = await this.authService.login(email, password);
    return token;
  }
}
