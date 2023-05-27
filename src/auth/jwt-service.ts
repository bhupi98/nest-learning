import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userService.findByEmailName(username);
    console.log('user', user);
    // if (!user || user.password !== password) {
    //   return null; // Authentication failed
    // }

    // Generate JWT token
    const token = this.jwtService.sign(
      { username },
      { expiresIn: '1m', secret: 'your-secret-key' },
    );
    console.log('user', token);
    // Save the token in the user's record in the database
    user.token = token;
    await this.userService.createUser(user);

    return token;
  }

  //   async login(username: string, password: string) {
  //     // Validate username and password

  //     // Generate JWT token
  //     const token = this.jwtService.sign(
  //       { username },
  //       { secret: 'your-secret-key' },
  //     );

  //     // Return the token to the client
  //     return { access_token: token };
  //   }
}
