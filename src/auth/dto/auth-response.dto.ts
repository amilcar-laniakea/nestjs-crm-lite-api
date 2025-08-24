import { Exclude } from 'class-transformer';

export class AuthResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password?: string;
}
