import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class NoteResponseDto {
  @ApiProperty({
    description: 'Note unique identifier',
    example: 'clh4n8o9w0000v8q8x7y9z0a3'
  })
  id: string;

  @ApiProperty({
    description: 'Note content',
    example: 'Client expressed interest in our premium package'
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Optional image URL',
    example: 'https://example.com/image.jpg'
  })
  image?: string;

  @ApiProperty({ description: 'Whether the note is important', example: false })
  isImportant: boolean;

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
    description: 'Associated client ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a1'
  })
  clientId: string;

  @ApiProperty({
    description: 'Author user ID',
    example: 'clh4n8o9w0000v8q8x7y9z0a2'
  })
  userId: string;
}
