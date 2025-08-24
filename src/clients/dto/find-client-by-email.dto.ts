import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindClientByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
