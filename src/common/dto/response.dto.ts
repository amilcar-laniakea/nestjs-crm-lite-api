import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: 'array', description: 'Array of items' })
  data: T[];

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  pageSize: number;
}

export class SuccessResponseDto<T> {
  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully'
  })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data: T;
}

export class ErrorResponseDto {
  @ApiProperty({ description: 'Error message', example: 'Validation failed' })
  message: string;

  @ApiProperty({ description: 'HTTP status code', example: 400 })
  statusCode: number;

  @ApiProperty({
    description: 'Error details',
    example: ['email must be valid']
  })
  error?: string | string[];
}
