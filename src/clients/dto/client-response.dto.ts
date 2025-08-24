import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';

export class ClientResponseDto {
  @ApiProperty({
    description: 'Client unique identifier',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  id: string;

  @ApiProperty({ description: 'Client full name', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Client email address',
    example: 'john.doe@example.com'
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Client phone number',
    example: '+1-555-123-4567'
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Client company',
    example: 'ACME Corporation'
  })
  company?: string;

  @ApiProperty({
    description: 'Client status',
    enum: ClientStatus,
    example: ClientStatus.ACTIVE
  })
  status: ClientStatus;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-01-01T00:00:00.000Z'
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Owner user ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a2'
  })
  ownerId: string;
}
