import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindClientByEmailDto {
  @ApiProperty({
    description: 'Email address to search for',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
