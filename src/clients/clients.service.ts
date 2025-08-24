import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdatePartialClientDto } from './dto/update-partial-client.dto';
import { Prisma, Client, Role } from '@prisma/client';
import { FindClientDto } from './dto/find-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createClientDto: CreateClientDto,
    ownerId: string
  ): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { email: createClientDto.email }
    });

    if (client) {
      throw new BadRequestException('User already exists');
    }

    return this.prisma.client.create({
      data: {
        ...createClientDto,
        ownerId
      }
    });
  }

  async findAll(query: FindClientDto, id: string, role: Role) {
    const { page = 1, pageSize = 10, ...filters } = query;
    let where: Prisma.ClientWhereInput = { ...filters };
    if (role !== Role.ADMIN) {
      where = { ...where, ownerId: id };
    }
    const skip = (Number(page) - 1) * Number(pageSize);
    const [data, total] = await Promise.all([
      this.prisma.client.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.client.count({ where })
    ]);
    return {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    };
  }

  async findById(id: string, ownerId: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: { id, ownerId }
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async findByEmail(email: string, ownerId: string): Promise<Client> {
    console.log('Finding client by email:', email);
    if (!email) {
      throw new BadRequestException('Email must be provided');
    }
    const client = await this.prisma.client.findFirst({
      where: { email, ownerId }
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async updatePartial(
    id: string,
    updatePartialClientDto: UpdatePartialClientDto,
    ownerId: string
  ): Promise<Client> {
    await this.findById(id, ownerId);
    return this.prisma.client.update({
      where: { id },
      data: updatePartialClientDto
    });
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
    ownerId: string
  ): Promise<Client> {
    await this.findById(id, ownerId);
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto
    });
  }

  async remove(id: string, ownerId: string): Promise<Client> {
    await this.findById(id, ownerId);
    return this.prisma.client.delete({ where: { id } });
  }
}
