import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Content of the note',
    example: 'Client expressed interest in our premium package',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'Optional image URL for the note',
    example: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Whether this note is marked as important',
    default: false,
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isImportant?: boolean;
}
