import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // async validate(payload: any) {
  //   const { username, exp } = payload;

  //   // Check if the token has expired
  //   const now = Math.floor(Date.now() / 1000);
  //   if (now > exp) {
  //     throw new UnauthorizedException('Token has expired');
  //   }

  //   const user = await this.userService.verifyTokenFromDatabase(
  //     username,
  //     payload.token,
  //   );

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid token');
  //   }

  //   return user;
  // }

  getSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
