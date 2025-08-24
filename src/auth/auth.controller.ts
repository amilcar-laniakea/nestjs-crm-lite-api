import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body()
    registerDto: RegisterDto
  ) {
    const user = await this.authService.register(registerDto);

    return {
      message: 'User has been created successfully',
      data: user
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    loginDto: LoginDto
  ) {
    const user = await this.authService.login(loginDto);

    return {
      message: 'User has been logged in successfully',
      data: user
    };
  }
}
