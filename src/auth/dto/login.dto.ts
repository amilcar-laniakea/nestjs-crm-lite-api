import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password'
  })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
