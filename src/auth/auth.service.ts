import * as bcryptjs from 'bcryptjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async register({ email, name, password }: RegisterDto) {
    const userexist = await this.usersService.findOneByEmail(email);

    if (userexist) {
      throw new BadRequestException('Email already in use');
    }

    return await this.usersService.create({
      email,
      name,
      password: await bcryptjs.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      )
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = plainToInstance(AuthResponseDto, user);
    const plainPayload = instanceToPlain(payload);
    const token = await this.jwtService.signAsync(plainPayload);

    return {
      token,
      expiresIn: process.env.JWT_EXPIRES_IN
    };
  }
}
