import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindNoteDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
    example: 1
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
    maximum: 100,
    example: 10
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;

  @ApiPropertyOptional({
    description: 'Search in note content (case insensitive)',
    example: 'meeting'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Filter by importance status',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isImportant?: boolean;
}
