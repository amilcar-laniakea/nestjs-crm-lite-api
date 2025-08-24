import { ClientStatus } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Full name of the client',
    example: 'John Doe',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the client',
    example: 'john.doe@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Phone number of the client',
    example: '+1-555-123-4567'
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Company name where the client works',
    example: 'ACME Corporation'
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({
    description: 'Status of the client',
    enum: ClientStatus,
    default: ClientStatus.ACTIVE,
    example: ClientStatus.ACTIVE
  })
  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;
}
