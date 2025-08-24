import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User has been created successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User has been created successfully'
        },
        statusCode: { type: 'number', example: 201 },
        data: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Email already in use' })
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

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        },
        expiresIn: { type: 'string', example: '7d' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
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
