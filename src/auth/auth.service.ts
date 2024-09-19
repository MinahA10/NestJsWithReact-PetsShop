import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<unknown> {
    const user = await this.usersService.findOneByEmail(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { ...result } = user;
      return result;
    }

    return null;
  }

  async login(user) {
    const payload = { name: user.name, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  //without passport
  async signIn(email: string, pass: string): Promise<{ token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, name: user.name };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
