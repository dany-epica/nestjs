import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ userName: username });
    if (user && user.password === pass) {
      // Exclude password, this will return to client
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userID: user.dataValues.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  userFromJwt(req: any): any {
    const token = req.headers.authorization.replace('Bearer ', '');
    const res = <{ [key: string]: string | number }>(
      this.jwtService.decode(token)
    );
    return this.usersService.findOne({ id: res.userID });
  }
}
