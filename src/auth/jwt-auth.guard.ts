import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    console.log('toekn', token);
    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'your-secret-key',
      });
      // Perform additional checks on the payload, if needed
      // e.g., verify if the user exists in the database

      // Attach the validated user to the request object
      const { exp } = payload;
      const now = Math.floor(Date.now() / 1000);
      console.log(now > exp);
      if (now > exp) {
        throw new UnauthorizedException('Token has expired');
      }
      const user = await this.userService.verifyTokenFromDatabase(
        payload.username,
        token,
      );
      if (!user) {
        throw new UnauthorizedException();
      }
      console.log('paylaod', payload);
      request.user = payload;

      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }

  private extractTokenFromRequest(request: any): string | null {
    const authorizationHeader = request.headers['authorization'];
    console.log('authorizationHeader', authorizationHeader);
    if (authorizationHeader) {
      return authorizationHeader;
    }
    return null;
  }
}
