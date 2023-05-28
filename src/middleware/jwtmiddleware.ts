import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    console.log('authHeader', authHeader);
    if (authHeader == null || authHeader == '') {
      throw new UnauthorizedException('Please provide token');
    }
    const token = authHeader;
    try {
      const decoded = this.jwtService.verify(token);
      console.log('decoded', decoded);
      const now = Math.floor(Date.now() / 1000);
      const { exp } = decoded;
      if (now > exp) {
        throw new UnauthorizedException('Token has expired');
      }
      try {
        const user = await this.userService.verifyTokenFromDatabase(
          decoded.username,
          token,
        );
        console.log('user214324', user);
        if (!user) {
          console.log('helele');
          throw new UnauthorizedException('User not found in the database');
        }

        req.user = decoded;
      } catch (error) {
        console.log('error', error.response);
        throw new UnauthorizedException(error);
      }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (
        err instanceof jwt.JsonWebTokenError &&
        err.message === 'invalid signature'
      ) {
        throw new BadRequestException('Invalid token signature');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }

    next();
  }
}
