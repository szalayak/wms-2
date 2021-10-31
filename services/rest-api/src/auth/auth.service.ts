import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { User } from './users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | void> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
