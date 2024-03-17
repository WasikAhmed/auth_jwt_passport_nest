import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user: User = await this.usersService.findOneByUsername(
      loginDto.username,
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto): Promise<AccessToken> {
    // const existingUser = await this.usersService.findOneByEmail(
    //   registerDto.email,
    // );
    //
    // if (existingUser) {
    //   throw new BadRequestException('email already exists');
    // }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser: { password: string; email: string; username: string } = {
      ...registerDto,
      password: hashedPassword,
    };
    const user: User = await this.usersService.create(newUser);

    return this.login(user);
  }
}
