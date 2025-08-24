import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isImportant?: boolean;
}
