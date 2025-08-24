import { Exclude } from 'class-transformer';
import { Role } from '@prisma/client';

export class AuthResponseDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password?: string;
}
