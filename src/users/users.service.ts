import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
}
