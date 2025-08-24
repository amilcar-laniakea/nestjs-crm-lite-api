import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: '1',
    example: '1'
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: '10',
    example: '10'
  })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}
